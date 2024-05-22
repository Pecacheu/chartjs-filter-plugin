//https://github.com/Pecacheu/chartjs-filter-plugin; MIT License

(() => {

function onInit(c) { //Setup data cache
	// let d=c.data, od=d.rawData=d.datasets, nd=d.datasets=[];
	// od.forEach(d => nd.push(utils.copy(d,1)));
	c.data.datasets.forEach(s => {s.rawData=s.data});
	let o=utils.setPropSafe(c,'options.plugins.filter',{},1);
	o.extDiv=o.extDiv||4, o.delay=o.delay||1000;
	o.debug=true; //TEMP
}
function onEnd(c) {
	//console.log("Update End");
	//c.dfRun=0;
	if(c._dft) return;
	c._dft = setTimeout(() => doUpdate(c), c.options.plugins.filter.delay);
}
function doUpdate(c) {
	c._dft=null; if(!c._x) c._x=c.getDatasetMeta(0).xScale;
	let ds=c.data.datasets, s=c._x.min, e=c._x.max;
	if(c._ds==s && c._de==e) return; c._ds=s,c._de=e;

	console.log('Update...');

	let j,dl,lb,ub, sx=c.options.plugins.filter.sameX,
	d=(e-s)/c.options.plugins.filter.extDiv; s-=d, e+=d;

	ds.forEach((n,i) => {
		d=n.rawData; if(!i || !sx) {
			dl=d.length, lb=0, ub=dl;
			for(j=0; j<dl; ++j) if(d[j].x >= s) {lb=j; break} //Find lower bound
			for(j=dl-1; j>0; --j) if(d[j].x <= e) {ub=j; break} //Find upper bound
		}
		n.data=d.slice(lb,ub+1);
	});
	c._dfr=1;

	if(c.options.plugins.filter.debug) {
		dl=[]; ds.forEach(d => dl.push(d.data.length)); dl=dl.join(', ');
		console.log(`SPLICE ${ds.length} scales to rng (${lb} -> ${ub}), len savings `+
			`${ds[0].rawData.length} -> ${ds[0]._data?ds[0]._data.length:'NULL'} -> ${dl}`);
	}
}

function doRedraw(c) {
	if(c._dfr) /*console.log("Redraw"),*/c._dfr=0,c.update('none');
}

Chart.register({id:'filter', install:onInit, afterDraw:onEnd, afterRender:doRedraw});

})();