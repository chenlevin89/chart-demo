const TOOLTIP_ELEMENT_STYLE = `
  background:white;
  border-radius:8px;
  padding:8px;
  color:#7b838c;
  opacity:1;
  pointer-events:none;
  position:absolute;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.15);
  transform:translate(-50%, 0);
  transition:all .1s ease;
`;

const TH_ELEMENT_STYLE = `
  border-width:0;
  text-align:left;
  font-size:13px;
  font-family:NHaasGroteskDSPro-75Bd;
`;

const ROUND_INDICATOR_ELEMENT_STYLE = `
  border-width:2px;
  margin-right:10px;
  height:6px;
  width:6px;
  display:inline-block;
  border-radius:50%
`;

const TR_ELEMENT_STYLE = `
  background-color:inherit;
  border-width:0;
  display:block;
  font-size:12px;
  color:#636363;
  font-family:HelveticaNeue;
`;

function getOrCreateTooltip(chart) {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.cssText = TOOLTIP_ELEMENT_STYLE;

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

function generateTooltipHeaderElement(title) {
  const tr = document.createElement('tr');
  const th = document.createElement('th');
  const text = document.createTextNode(title);

  tr.style.borderWidth = '0';
  th.style.cssText = TH_ELEMENT_STYLE;
  th.colSpan = 2;

  th.appendChild(text);
  tr.appendChild(th);
  return tr;
}

function generateTooltipBodyRow({tooltip, i, bodyLines, body}) {
  const colors = tooltip.labelColors[i];
  const span = document.createElement('span');
  const tr = document.createElement('tr');
  const td = document.createElement('td');

  span.style.cssText = `
    background:${colors.backgroundColor};
    border-color:${colors.borderColor};
    ${ROUND_INDICATOR_ELEMENT_STYLE}
  `;

  tr.style.cssText = TR_ELEMENT_STYLE;
  i < bodyLines.length - 1 ? tr.style.borderBottom = '1px solid #e5e7e9' : null;
  td.style.borderWidth = '0';

  const parsedBody = body[0].split(': ');
  const label = parsedBody[0];
  const val = `${parsedBody[1]}${i === bodyLines.length - 1 ? 'K' : '%'}`;
  const labelTd = document.createElement('td');
  labelTd.innerText = label;
  labelTd.style.cssText = `
    border-width:0;
    width:120px;
    height:26px;
  `;

  const valueTd = document.createElement('td');
  valueTd.innerText = val;
  valueTd.style.width = '40px';
  valueTd.style.borderWidth = '0';

  td.appendChild(span);
  tr.appendChild(td);
  tr.appendChild(labelTd)
  tr.appendChild(valueTd);
  return tr;
}

export function externalTooltipHandler(context) {

  const {chart, tooltip} = context;
  const tooltipEl = getOrCreateTooltip(chart);

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  if (tooltip.body) {

    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');
    const tableRoot = tooltipEl.querySelector('table');

    titleLines.forEach(title => {
      const tr = generateTooltipHeaderElement(title);
      tableHead.appendChild(tr);
    });

    bodyLines.forEach((body, i) => {
      const tr = generateTooltipBodyRow({tooltip, i, bodyLines, body})
      tableBody.appendChild(tr);
    });

    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};
