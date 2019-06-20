# Multi-level CSV (CSV_ML)

This is an Advanced Parser for CSV (Comma-separated-value), TSV (Tab-separated-value), TDV (Tab-delimited-value) or even files with custom delimiters such as the Pipe symbol (|).  It supports streams and pull parsing for handling huge data files.  It also supports comments and empty lines within the delimited files for annotation.

In addition to parsing regular tabular formats with or without header, it can also parse structured delimited files and convert them to XML DOM or JSON objects.

This project proposes the idea of using CSV format for defining structured relational data in additional to tabular data. The idea is nick named CSV_ML (Multi-level CSV). CSV_ML attempts to provide a simple unambiguous format for representing structured data that includes schema definition.

# Applications

- Enterprise Application Integration (EAI)
- Lightweight alternative to JSON or XML in Three-tier architecture
- Alternative to XML in transfer of data using AJAX
- Data storage and transfer format for embedded platforms such as Arduino and Raspberry PI.
- Data storage and transfer format for mobile/tablet devices based on Android, Windows or iOS.
- Data transfer format for spreadsheets as Tab delimited values through clipboard or otherwise.
    
For complete documentation and examples, download [Multi-level nested CSV.pdf](http://siara.cc/csv_ml/Multi-level%20nested%20CSV%20TDV.pdf)

# Usage

## Basic usage

Instantiate `CSV_ML_Parser` class, and parse any CSV or Multi-Level CSV into JSON or XML object:

```js
var csv_ml = require('csv_ml_parser.siara.cc');
var csv_ml_parser = new csv_ml.CSV_ML_Parser("Hello,World");
var ret = csv_ml_parser.parse("jso", false);
if (csv_ml_parser.ex.display_exceptions()) { /* Handle error */ return };
console.log(JSON.stringify(ret, null, ' '));
```

Try out different pre-defined examples online at http://siara.cc/csv_ml/csv_ml_js.html

# Advantages over XML and JSON

CSV_ML
- saves storage space (about 50% compared to JSON and 60-70% compared to XML)
- increases data transfer speeds
- is faster to parse compared to XML and JSON
- allows full schema definition and validation
- makes schema definition simple, lightweight and in-line compared to DTD or XML Schema
- recognizes standard data types including text (varchar), integer, real, date, datetime
- allows database binding
- can be used in EAI (Application Integration) for import and export of data
- is simpler to parse, allowing data to be available even in low memory devices

# Examples

The examples given in the documentation are available as demo applications:
* For Java Swing demo application (executable jar), download [csv_ml_swing_demo-1.0.0.jar](http://siara.cc/csv_ml/csv_ml_swing_demo-1.0.0.jar)
* For Android demo application, download [csv_ml_android_demo-1.0.0.apk](http://siara.cc/csv_ml/csv_ml_android_demo-1.0.0.apk)
* For online Javascript demo application, [click here](http://siara.cc/csv_ml/csv_ml_js.html)
* For online Java Applet demo application [click here](http://siara.cc/csv_ml/csv_ml_applet_demo.html)

For running Javascript and Java Applet demos, you may have to change security settings in your browser.

The given demos convert between CSV, TDV. XML and JSON (CSV to XML DOM, CSV to JSON, TDV to XML DOM, TDV to JSON, XML to CSV). It is basically a CSV TDV TSV to JSON XML Convertor. It also demonstrates how database binding can be achieved using SQLite db.

# Screenshots

<div style="height:800px; overflow-y:scroll">
<h3>Example 1.1: Conventional CSV</h3>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.1.1.Conventional.Table.data.png' title='CSV to XML - 1.1 Conventional Table data'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.1.1.Conventional.Table.data.png' title='CSV to JSON - 1.1 Conventional Table data'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.1.1.Conventional.Table.data.png' title='XPath on CSV - 1.1 Conventional Table data'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.1.1.Conventional.Table.data.png' title='TSV to XML - 1.1 Conventional Table data'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.1.1.Conventional.Table.data.png' title='TSV to JSON - 1.1 Conventional Table data'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.1.1.Conventional.Table.data.png' title='Pipe delimiter to JSON - 1.1 Conventional Table data'/><br/><br/>

<h3>Example 1.2: Conventional CSV without Header</h3>
<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.1.2.Table.data.without.Header.png' title='CSV to XML - 1.2 Table data without Header'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.1.2.Table.data.without.Header.png' title='CSV to JSON - 1.2 Table data without Header'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.1.2.Table.data.without.Header.png' title='XPath on CSV - 1.2 Table data without Header'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.1.2.Table.data.without.Header.png' title='TSV to XML - 1.2 Table data without Header'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.1.2.Table.data.without.Header.png' title='TSV to JSON - 1.2 Table data without Header'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.1.2.Table.data.without.Header.png' title='Pipe delimiter to JSON - 1.2 Table data without Header'/><br/><br/>

<h3>Example 1.3 and 1.4: Conventional CSV with Header and Node name</h3>
<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.1.3.Table.data.with.Header.and.Node.name.png' title='CSV to XML - 1.3 Table data with Header and Node name'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.1.3.Table.data.with.Header.and.Node.name.png' title='CSV to JSON - 1.3 Table data with Header and Node name'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.1.3.Table.data.with.Header.and.Node.name.png' title='XPath on CSV - 1.3 Table data with Header and Node name'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.1.3.Table.data.with.Header.and.Node.name.png' title='TSV to XML - 1.3 Table data with Header and Node name'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.1.3.Table.data.with.Header.and.Node.name.png' title='TSV to JSON - 1.3 Table data with Header and Node name'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.1.3.Table.data.with.Header.and.Node.name.png' title='Pipe delimiter to JSON - 1.3 Table data with Header and Node name'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.1.4.Table.data.with.Header.and.Node.index.png' title='CSV to XML - 1.4 Table data with Header and Node index'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.1.4.Table.data.with.Header.and.Node.index.png' title='CSV to JSON - 1.4 Table data with Header and Node index'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.1.4.Table.data.with.Header.and.Node.index.png' title='XPath on CSV - 1.4 Table data with Header and Node index'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.1.4.Table.data.with.Header.and.Node.index.png' title='TSV to XML - 1.4 Table data with Header and Node index'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.1.4.Table.data.with.Header.and.Node.index.png' title='TSV to JSON - 1.4 Table data with Header and Node index'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.1.4.Table.data.with.Header.and.Node.index.png' title='Pipe delimiter to JSON - 1.4 Table data with Header and Node index'/><br/><br/>

<h3>Example 1.5: Multiple nodes under root</h3>
<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.1.5.Multiple.nodes.under.root.png' title='CSV to XML - 1.5 Multiple nodes under root'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.1.5.Multiple.nodes.under.root.png' title='CSV to JSON - 1.5 Multiple nodes under root'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.1.5.Multiple.nodes.under.root.png' title='XPath on CSV - 1.5 Multiple nodes under root'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.1.5.Multiple.nodes.under.root.png' title='TSV to XML - 1.5 Multiple nodes under root'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.1.5.Multiple.nodes.under.root.png' title='TSV to JSON - 1.5 Multiple nodes under root'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.1.5.Multiple.nodes.under.root.png' title='Pipe delimiter to JSON - 1.5 Multiple nodes under root'/><br/><br/>

<h3>Example 2.1: Multiple level CSV data</h3>
<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.2.1.Multiple.level.data.png' title='CSV to JSON - 2.1 Multiple level data'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.2.1.Multiple.level.data.png' title='CSV to JSON - 2.1 Multiple level data'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.2.1.Multiple.level.data.png' title='XPath on CSV - 2.1 Multiple level data'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.2.1.Multiple.level.data.png' title='TSV to XML - 2.1 Multiple level data'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.2.1.Multiple.level.data.png' title='TSV to JSON - 2.1 Multiple level data'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.2.1.Multiple.level.data.png' title='Pipe delimiter to JSON - 2.1 Multiple level data'/><br/><br/>

<h3>Example 2.2: Multiple level CSV data with siblings</h3>
<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.2.2.Multiple.level.data.with.siblings.png' title='CSV to XML - 2.2 Multiple level data with siblings'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.2.2.Multiple.level.data.with.siblings.png' title='CSV to JSON - 2.2 Multiple level data with siblings'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.2.2.Multiple.level.data.with.siblings.png' title='XPath on CSV - 2.2 Multiple level data with siblings'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.2.2.Multiple.level.data.with.siblings.png' title='TSV to XML - 2.2 Multiple level data with siblings'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.2.2.Multiple.level.data.with.siblings.png' title='TSV to JSON - 2.2 Multiple level data with siblings'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.2.2.Multiple.level.data.with.siblings.png' title='Pipe delimiter to JSON - 2.2 Multiple level data with siblings'/><br/><br/>

<h3>Example 3.1: Node attributes and content</h3>
<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.3.1.Node.attributes.png' title='CSV to XML - 3.1 Node attributes'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.3.1.Node.attributes.png' title='CSV to JSON - 3.1 Node attributes'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.3.1.Node.attributes.png' title='XPath on CSV - 3.1 Node attributes'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.3.1.Node.attributes.png' title='TSV to XML - 3.1 Node attributes'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.3.1.Node.attributes.png' title='TSV to JSON - 3.1 Node attributes'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.3.1.Node.attributes.png' title='Pipe delimiter to JSON - 3.1 Node attributes'/><br/><br/>

<h3>Example 3.2: Node content</h3>
<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.3.2.Node.content.png' title='CSV to XML - 3.2 Node content'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.3.2.Node.content.png' title='CSV to JSON - 3.2 Node content'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.3.2.Node.content.png' title='XPath on CSV - 3.2 Node content'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.3.2.Node.content.png' title='TSV to XML - 3.2 Node content'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.3.2.Node.content.png' title='TSV to JSON - 3.2 Node content'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.3.2.Node.content.png' title='Pipe delimiter to JSON - 3.2 Node content'/><br/><br/>

<h3>Example 3.3: Quote handling</h3>
<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.3.3.Quote.handling.png' title='CSV to XML - 3.3 Quote handling'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.3.3.Quote.handling.png' title='CSV to JSON - 3.3 Quote handling'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.3.3.Quote.handling.png' title='XPath on CSV - 3.3 Quote handling'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.3.3.Quote.handling.png' title='TSV to XML - 3.3 Quote handling'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.3.3.Quote.handling.png' title='TSV to JSON - 3.3 Quote handling'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.3.3.Quote.handling.png' title='Pipe delimiter to JSON - 3.3 Quote handling'/><br/><br/>

<h3>Example 3.4: Inline comments and empty lines</h3>
<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.3.4.Inline.comments.and.empty.lines.png' title='CSV to XML - 3.4 Inline comments and empty lines'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.3.4.Inline.comments.and.empty.lines.png' title='CSV to JSON - 3.4 Inline comments and empty lines'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.3.4.Inline.comments.and.empty.lines.png' title='XPath on CSV - 3.4 Inline comments and empty lines'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.3.4.Inline.comments.and.empty.lines.png' title='TSV to XML - 3.4 Inline comments and empty lines'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.3.4.Inline.comments.and.empty.lines.png' title='TSV to JSON - 3.4 Inline comments and empty lines'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.3.4.Inline.comments.and.empty.lines.png' title='Pipe delimiter to JSON - 3.4 Inline comments and empty lines'/><br/><br/>

<h3>Example 3.5: Changing root node</h3>
<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.3.5.1.Changing.root.node.png' title='CSV to XML - 3.5.1 Changing root node'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.3.5.1.Changing.root.node.png' title='CSV to JSON - 3.5.1 Changing root node'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.3.5.1.Changing.root.node.png' title='XPath on CSV - 3.5.1 Changing root node'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.3.5.1.Changing.root.node.png' title='TSV to XML - 3.5.1 Changing root node'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.3.5.1.Changing.root.node.png' title='TSV to JSON - 3.5.1 Changing root node'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.3.5.1.Changing.root.node.png' title='Pipe delimiter to JSON - 3.5.1 Changing root node'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.3.5.2.Changing.root.node-data.node.as.root.png' title='CSV to XML - 3.5.2 Changing root node - data node as root'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.3.5.2.Changing.root.node-data.node.as.root.png' title='CSV to JSON - 3.5.2 Changing root node - data node as root'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.xpath.3.5.2.Changing.root.node-data.node.as.root.png' title='XPath on CSV - 3.5.2 Changing root node - data node as root'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.3.5.2.Changing.root.node-data.node.as.root.png' title='TSV to XML - 3.5.2 Changing root node - data node as root'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.3.5.2.Changing.root.node-data.node.as.root.png' title='TSV to JSON - 3.5.2 Changing root node - data node as root'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.3.5.2.Changing.root.node-data.node.as.root.png' title='Pipe delimiter to JSON - 3.5.2 Changing root node - data node as root'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.3.5.3.Changing.root.node-error.case.1.png' title='CSV to XML - 3.5.3 Changing root node - error case 1'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.3.5.3.Changing.root.node-error.case.1.png' title='CSV to JSON - 3.5.3 Changing root node - error case 1'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.3.5.3.Changing.root.node-error.case.1.png' title='TSV to XML - 3.5.3 Changing root node - error case 1'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.3.5.3.Changing.root.node-error.case.1.png' title='TSV to JSON - 3.5.3 Changing root node - error case 1'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.3.5.3.Changing.root.node-error.case.1.png' title='Pipe delimiter to JSON - 3.5.3 Changing root node - error case 1'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.3.5.4.Changing.root.node-error.case.2.png' title='CSV to XML - 3.5.4 Changing root node - error case 2'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.3.5.4.Changing.root.node-error.case.2.png' title='CSV to JSON - 3.5.4 Changing root node - error case 2'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.3.5.4.Changing.root.node-error.case.2.png' title='TSV to XML - 3.5.4 Changing root node - error case 2'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.3.5.4.Changing.root.node-error.case.2.png' title='TSV to JSON - 3.5.4 Changing root node - error case 2'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.3.5.4.Changing.root.node-error.case.2.png' title='Pipe delimiter to JSON - 3.5.4 Changing root node - error case 2'/><br/><br/>

<h3>Example 3.6: Namespaces</h3>
<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.3.6.1.Namespaces.1.png' title='CSV to XML - 3.6.1 Namespaces (1)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.3.6.1.Namespaces.1.png' title='CSV to JSON - 3.6.1 Namespaces (1)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.3.6.1.Namespaces.1.png' title='TSV to XML - 3.6.1 Namespaces (1)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.3.6.1.Namespaces.1.png' title='TSV to JSON - 3.6.1 Namespaces (1)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.3.6.1.Namespaces.1.png' title='Pipe delimiter to JSON - 3.6.1 Namespaces (1)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.3.6.2.Namespaces.2.png' title='CSV to XML - 3.6.2 Namespaces (2)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.3.6.2.Namespaces.2.png' title='CSV to JSON - 3.6.2 Namespaces (2)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.3.6.2.Namespaces.2.png' title='TSV to XML - 3.6.2 Namespaces (2)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.3.6.2.Namespaces.2.png' title='TSV to JSON - 3.6.2 Namespaces (2)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.3.6.2.Namespaces.2.png' title='Pipe delimiter to JSON - 3.6.2 Namespaces (2)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.3.6.3.Namespaces.3.png' title='CSV to XML - 3.6.3 Namespaces (3)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.3.6.3.Namespaces.3.png' title='CSV to JSON - 3.6.3 Namespaces (3)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.3.6.3.Namespaces.3.png' title='TSV to XML - 3.6.3 Namespaces (3)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.3.6.3.Namespaces.3.png' title='TSV to JSON - 3.6.3 Namespaces (3)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.3.6.3.Namespaces.3.png' title='Pipe delimiter to JSON - 3.6.3 Namespaces (3)'/><br/><br/>

<h3>Example 3.7: Re-using node definitions</h3>
<img src='https://siara.cc/csv_ml/screenshots/csv.to.xml.3.7.Re-using.node.definitions.png' title='CSV to XML - 3.6.3 Namespaces (3)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/csv.to.json.3.7.Re-using.node.definitions.png' title='CSV to JSON - 3.6.3 Namespaces (3)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.xml.3.7.Re-using.node.definitions.png' title='TSV to XML - 3.6.3 Namespaces (3)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/tdv.to.json.3.7.Re-using.node.definitions.png' title='TSV to JSON - 3.6.3 Namespaces (3)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/pipe.delimiter.to.json.3.7.Re-using.node.definitions.png' title='Pipe delimiter to JSON - 3.7  Re-using node definitions'/><br/><br/>

<h3>Example 4.1: Specifying Type and Length</h3>
<img src='https://siara.cc/csv_ml/screenshots/ddl.dml.4.1.Schema.Specifying.type.and.length.png' title='DDL, DML - 4.1 Schema Specifying type and length'/><br/><br/>

<h3>Example 4.2: Default value</h3>
<img src='https://siara.cc/csv_ml/screenshots/ddl.dml.4.2.Schema.Default.value.png' title='DDL, DML - 4.2 Schema Default value'/><br/><br/>

<h3>Example 4.3: Null values</h3>
<img src='https://siara.cc/csv_ml/screenshots/ddl.dml.4.3.1.Schema.Null.values.(1).png' title='DDL, DML - 4.3.1 Schema Null values (1)'/><br/><br/>

<img src='https://siara.cc/csv_ml/screenshots/ddl.dml.4.3.2.Schema.Null.values.(2).png' title='DDL, DML - 4.3.2 Schema Null values (2)'/><br/><br/>

<h3>Example 4.4: Precision and Scale</h3>
<img src='https://siara.cc/csv_ml/screenshots/ddl.dml.4.4.Schema.Precision.and.Scale.png' title='DDL, DML - 4.4 Schema Precision and Scale'/><br/><br/>

<h3>Example 4.5: Date and Time</h3>
<img src='https://siara.cc/csv_ml/screenshots/ddl.dml.4.5.Schema.Date.and.Time.png' title='DDL, DML - 4.5 Schema Date and Time'/><br/><br/>

<h3>Example 4.6: Special column id</h3>
<img src='https://siara.cc/csv_ml/screenshots/ddl.dml.4.6.Schema.Special.column.id.png' title='DDL, DML - 4.6 Schema Special column id'/><br/><br/>

<h3>Example 4.7: Special column parent_id</h3>
<img src='https://siara.cc/csv_ml/screenshots/ddl.dml.4.7.Schema.Special.column.parent_id.png' title='DDL, DML - 4.7 Schema Special column parent_id'/><br/><br/>

<h3>Retrieving data for Example 2.1</h3>
<img src='https://siara.cc/csv_ml/screenshots/sql.2.1.Multiple.level.data.png' title='Data Retrieval - 2.1 Multiple level data'/><br/><br/>
<h3>Retrieving data for Example 1.5</h3>
<img src='https://siara.cc/csv_ml/screenshots/sql.1.5.Multiple.nodes.under.root.png' title='Data Retrieval - 1.5 Multiple nodes under root'/><br/><br/>

</div>

# Contact

Create issue here or contact arun@siara.cc for any queries or feedback.
