import { Component } from "react";
import ReactDOM from "react-dom";


const copyRulesTo = (cssRules, doc) => {
    const newStyleEl = doc.createElement('style');
    cssRules.forEach(cssRule => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(doc.createTextNode(cssRule.cssText));
    });

    doc.head.appendChild(newStyleEl);

}

const getCssRules = (doc) => {
    const allRules = [];

    Array.from(doc.styleSheets).map( (sheet) => {
        try{
            if(sheet.cssRules){
                const rules = Array.from(sheet.cssRules);
                rules.map(rule => {
                    allRules.push(rule);
                    return null;
                });
            }
        }
        catch(e) {
            console.log("ERROR");
            console.log(sheet)
        }
        return null;
        
    });
    return allRules;
}

const copyStylesheet = (sourceDoc, targetDoc) => {

    copyRulesTo(
        getCssRules(sourceDoc),
        targetDoc
    );
}



class NewWindow extends Component {
    constructor(props) {
        super(props);
        this.containerEl = document.createElement('div');
        this.externalWindow = null;

    }

    
    render() {
        return ReactDOM.createPortal(
            this.props.children, 
            this.containerEl
        );
    }
  
    componentDidMount() {
        const { closeNewWindow } = this.props;
        
        this.externalWindow = window.open(
            '', 
            '', 
            'width=600,height=400,left=200,top=200'
        );
    
        copyStylesheet(document, this.externalWindow.document);

        this.externalWindow.document.body.appendChild(this.containerEl);

        this.externalWindow.addEventListener('beforeunload', (event) => {
            event.preventDefault();
            closeNewWindow();
            
        });
    }

    componentDidUpdate() {
        copyStylesheet(
            document, 
            this.externalWindow.document
        );
    }
  
    componentWillUnmount() {
        this.externalWindow.close();
    }
  }


  export default NewWindow;