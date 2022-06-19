import React ,{Component} from "react";

import {mf} from 'diagram-library';
 import { DiagramView, NodeListView} from 'diagram-library-react';



 class DiagramApp extends Component {


    constructor(props){
        super(props)


        var diagram = new mf.Diagramming.Diagram()

        var nodes = [];
        var shapes  = ["arrow3", "Rectangle", "cloud"];
        for (var i=0 ; i < shapes.length ; i++){


            var node = new mf.Diagramming.ShapeNode(diagram);
            node.setText(shapes[i]);
            node.setShape(shapes[i]);
            nodes.push(node)
          }


          this.state= {

            diagram : diagram,
            nodes : nodes ,
            captions : shapes
          }
    }


    render ( ){


        return (

            <div className="conteneur">

                    <div className="sidebar-left">

                        <NodeListView 
                        nodes={this.state.nodes}
                        captions={ this.state.captions }></NodeListView>
                    </div>
            <div className="main">

                <DiagramView diagram={this.state.diagram}
/>            </div>


            </div>
        )
    }
     

 }

 export default DiagramApp;
