# Chart.js Filter Plugin
A [Chart.js](https://chartjs.org) plugin to massively improve performance of the [zoom plugin](https://github.com/chartjs/chartjs-plugin-zoom), real-time data, and other animated applications with large datasets by filtering data to only what is visible on-screen.

## Usage
- Your chart chart must be in [raw format](https://www.chartjs.org/docs/latest/general/data-structures.html#dataset-configuration) with parsing set to false, as required by the [decimation plugin](https://www.chartjs.org/docs/latest/configuration/decimation.html).
- To improve performance when all datasets have equal X-axis data, set `options.plugins.filter.sameX` to true in your config.

## Options
Plugin options in `options.plugins.filter`
- `enabled`: Enables the plugin
- `sameX`: Improves performance when all datasets are the same length. *(Default: false)*
- `extDiv`: The distance drawn outside the screen is `pageWidth/extDiv`. *(Default: 4)*
- `forceRedraw`: If `lastUpdateRange/currentRange` exceeds this value, an update is forced mid-animation. *(Default: 25)*

###### This plugin is inspired by [a post from Evertvdw](https://github.com/chartjs/chartjs-plugin-zoom/issues/75#issuecomment-361840682).