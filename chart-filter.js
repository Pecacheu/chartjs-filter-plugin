//https://github.com/Pecacheu/chartjs-filter-plugin v1.1; MIT License

(() => {

function onInit(c) {
	let o; try {o=c.options.plugins.filter} catch(_) {}
	if(!o || !o.enabled) return;
	o.extDiv||(o.extDiv=4), o.forceRedraw||(o.forceRedraw=25);
	o._ifr=1/o.forceRedraw;
	c.data.datasets.forEach(s => {s.rawData=s.data}); //Data cache
}
function onEnd(c) {
	let o=c.options.plugins.filter;
	if(!o.enabled) c._x=0;
	else if(c._x) { //Check for force-redraw
		let xd=c._dr/(c._x.max-c._x.min);
		if(xd>o.forceRedraw || xd<o._ifr) doUpdate(c);
	} else if(c._x=c.getDatasetMeta(0).xScale) doUpdate(c); //Initial update
}

function doUpdate(c) {
	let ds=c.data.datasets, s=c._x.min, e=c._x.max;
	if(c._ds==s && c._de==e) return; c._ds=s, c._de=e, c._dr=e-s;

	let j,dl,lb,ub, o=c.options.plugins.filter,
		sx=o.sameX, d=c._dr/o.extDiv; s-=d,e+=d;

	ds.forEach((n,i) => {
		d=n.rawData; if(!i || !sx) {
			dl=d.length, lb=0, ub=dl;
			for(j=0; j<dl; ++j) if(d[j].x >= s) {lb=j; break} //Find lower bound
			for(j=dl-1; j>0; --j) if(d[j].x <= e) {ub=j; break} //Find upper bound
		}
		n.data=d.slice(lb,ub+1);
	});
	c._dfr=1; //Set redraw flag

	if(o.debug) {
		dl=[]; ds.forEach(d => dl.push(d.data.length)); dl=dl.join(', ');
		console.log(`SPLICE ${ds.length} scales to rng (${lb} -> ${ub}), len savings `+
			`${ds[0].rawData.length} -> ${ds[0]._data?ds[0]._data.length:'NULL'} -> ${dl}`);
	}
}
function doRedraw(c) {
	if(c._x && !c._dfr) doUpdate(c);
	if(c._dfr) c._dfr=0,c.update('none');
}

Chart.register({id:'filter', install:onInit, afterDraw:onEnd, afterRender:doRedraw});

})();