import { render } from "react-dom";
import "./index.css";
import IconButton from "@material-ui/core/IconButton";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import ViewHeadlineOutlinedIcon from "@material-ui/icons/ViewHeadlineOutlined";
import * as React from "react";
import { PropertyPane } from "./property-pane";
// import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  MapsComponent,
  Inject,
  LayersDirective,
  LayerDirective,
  Legend,
  MapsTooltip,
} from "@syncfusion/ej2-react-maps";
import { SampleBase } from "./sample-base";
import data from "./map-data/legend-datasource.json";
import WorldShape from "./map-data/map.json";
let datasource = data;

console.log(WorldShape);
for (var i = 0; i < data.length; i++) {
  // for (var j = 0; j < WorldShape.regionData.length; i++) {
  console.log(data[i].country);
  //   }
}
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class LegendMaps extends SampleBase {
  dataChange(args) {
    if (args.checked) {
      this.mapInstance.layers[0].shapeSettings.colorMapping[5].color =
        "lightgrey";
      this.mapInstance.layers[0].shapeSettings.colorMapping[5].label =
        "No Data";
    } else {
      this.mapInstance.layers[0].shapeSettings.colorMapping[5].color = null;
      this.mapInstance.layers[0].shapeSettings.colorMapping[5].label = null;
    }
    this.mapInstance.refresh();
  }
  toggleLegendChange(args) {
    this.mapInstance.refresh();
  }
  render() {
    return (
      <div className="control-pane">
        <style>{SAMPLE_CSS}</style>{" "}
        <div className="col-lg-8 control-section">
          <MapsComponent
            id="maps"
            tooltipRender={this.tooltip}
            loaded={this.onMapsLoad.bind(this)}
            load={this.load}
            zoomSettings={{
              enable: false,
            }}
            legendSettings={{
              // mode: "Interactive",
              visible: true,
              position: "Bottom",
            }}
            // titleSettings={{
            //   text: "Population density (per square kilometer) - 2015",
            //   textStyle: {
            //     size: "16px",
            //   },
            // }}
          >
            <Inject services={[Legend, MapsTooltip]} />
            <LayersDirective>
              {/* import WorldShape from "./map.json";                            
                 <LayerDirective shapeData={shapeData} shapePropertyPath='name' shapeDataPath='name' dataSource={datasource.legend} tooltipSettings={{ */}
              {}
              <LayerDirective
                // shapeData={
                //   new MapAjax(
                //     "https://ej2.syncfusion.com/react/demos/src/maps/map-data/world-map.json"
                //   )
                // }
                // "name" === "United States of America"
                //       ? ("USA" = "name")
                //       : "name"
                onFocus={(e) => e.preventDefault()}
                shapeData={WorldShape}
                shapePropertyPath="name"
                shapeDataPath="country"
                dataSource={datasource.regionData}
                tooltipSettings={{
                  visible: true,
                  valuePath: "name",
                  format: "${country} : ${activeCases}",
                }}
                shapeSettings={{
                  colorValuePath: "activeCases",
                  colorMapping: [
                    {
                      from: 0,
                      to: 1000,
                      color: "rgb(153,174,214)",
                      label: "<1000",
                    },
                    {
                      from: 1000,
                      to: 10000,
                      color: "rgb(115,143,199)",
                      label: "1000 - 10000",
                    },
                    {
                      from: 10000,
                      to: 100000,
                      color: "rgb(77,112,184)",
                      label: "10000 - 100000",
                    },
                    {
                      from: 100000,
                      to: 1000000,
                      color: "rgb(38,82,168)",
                      label: "100000 - 1000000",
                    },
                    {
                      from: 1000000,
                      to: 100000000,
                      color: "rgb(0,51,153)",
                      label: ">100000000",
                    },
                    {
                      color: null,
                      label: null,
                    },
                  ],
                }}
              ></LayerDirective>
            </LayersDirective>
          </MapsComponent>
        </div>
        <div className="col-lg-4 property-section">
          <PropertyPane>
            <table
              id="property"
              title="Properties"
              className="property-panel-table"
              style={{ width: "100%", marginBottom: "20px" }}
            ></table>
          </PropertyPane>
        </div>
      </div>
    );
  }
  onMapsLoad(args) {
    let maps = document.getElementById("maps");
    maps.setAttribute("title", "");
  }
  tooltip(args) {
    if (!args.options["data"]) {
      args.cancel = true;
    }
  }
}

export default LegendMaps; // render(<LegendMaps />, document.getElementById("sample"));
