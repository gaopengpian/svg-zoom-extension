const svg = document.querySelector('svg');
if (!svg) throw new Error('No <svg> found');

const kids = [...svg.children].filter(c => c.tagName.toLowerCase() === 'g');

// 唯一 <g> → 直接用作缩放层；否则新建 wrapper
const g = kids.length === 1
    ? kids[0]
    : (() => {
        const wrapper = document.createElementNS(svg.namespaceURI, 'g');
        for (const child of [...svg.children]) wrapper.appendChild(child);
        svg.appendChild(wrapper);
        return wrapper;
    })();

svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');

const zoom = d3.zoom().scaleExtent([0.01, 100])
    .on('zoom', e => d3.select(g).attr('transform', e.transform));

d3.select(svg).call(zoom).call(zoom.transform, d3.zoomIdentity);
