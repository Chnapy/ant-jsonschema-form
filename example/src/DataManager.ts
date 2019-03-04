import crossfilter, { Crossfilter, Dimension, Grouping } from 'crossfilter2'
import * as d3 from 'd3'

export default class DataManager {

  private crossfilter: Crossfilter<any>

  dimensionDEX: Dimension<any, any>
  groupDEX: Grouping<any, any>[]

  dimensionDEP: Dimension<any, any>
  groupDEP: Grouping<any, any>[]

  dimensionDIR: Dimension<any, any>
  groupDIR: Grouping<any, any>[]


  constructor() {

    this.crossfilter = crossfilter()

  }

  async init(): Promise<void> {

    const rawData = await d3.dsv(';', require('./secteurs.csv'))

    // const data = rawData.map(d => {
    //   try {
    //     return dsv.parse(d as any);
    //   } catch(e) {
    //     console.warn(d);
    //   }
    // });

    // const data = rawData.map(d => d3.csvParse(d));

    this.crossfilter.add(rawData)

    console.log(rawData)

    this.dimensionDEX = this.crossfilter.dimension(d => d.DEX)
    this.groupDEX = this.dimensionDEX.group().all().filter(d => !!d.value);

    this.dimensionDEP = this.crossfilter.dimension(d => d.DEP)
    this.groupDEP = this.dimensionDEP.group().all().filter(d => !!d.value);

    this.dimensionDIR = this.crossfilter.dimension(d => d.DIR)
    this.groupDIR = this.dimensionDIR.group().all().filter(d => !!d.value);

    console.log(this.dimensionDEX, this.dimensionDEP, this.dimensionDIR)

  }

  filter(dimension: 'dex' | 'dep' | 'dir', value: any): void {

    switch(dimension) {
      case 'dex':
        this.dimensionDEX.filter(value);
        this.groupDEX = this.dimensionDEX.group().all().filter(d => !!d.value);
        break;
      case 'dep':
        this.dimensionDEP.filter(value);
        this.groupDEP = this.dimensionDEP.group().all().filter(d => !!d.value);
        break;
      case 'dir':
        this.dimensionDIR.filter(value);
        this.groupDIR = this.dimensionDIR.group().all().filter(d => !!d.value);
        break;
    }

  }

}
