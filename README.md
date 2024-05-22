# Chart.js Filter Plugin
A [Chart.js](https://chartjs.org) plugin to massively improve performance of the [zoom plugin](https://github.com/chartjs/chartjs-plugin-zoom), real-time data, and other animated applications with large datasets by filtering data to only what is visible on-screen.

## Usage
- Your chart chart must be in [raw format](https://www.chartjs.org/docs/latest/general/data-structures.html#dataset-configuration) with parsing set to false, as required by the [decimation plugin](https://www.chartjs.org/docs/latest/configuration/decimation.html).
- To improve performance when all your datasets have data at the same X indexes, set `options.plugins.filter.sameX` to true in your chart config.

## Options
TBD

###### This plugin is inspired by [a post from Evertvdw](https://github.com/chartjs/chartjs-plugin-zoom/issues/75#issuecomment-361840682).