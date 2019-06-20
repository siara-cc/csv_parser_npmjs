var XMLUtil = function() {
}
XMLUtil.parseXMLToDOM = function(xml) {
   var obj_out = null;
   try {
      if (window.DOMParser) {
         parser = new DOMParser();
         obj_out = parser.parseFromString(xml, "text/xml");
      } else { // code for IE
         obj_out = new ActiveXObject("Microsoft.XMLDOM");
         obj_out.async = false;
         obj_out.loadXML(xml);
      }
   } catch (e) {
      alert(e);
   }
   return obj_out;
}
XMLUtil.prettyPrint = function(xml) {
var out = "";
var lt_count = 0;
var level = 0;
var xml_len = xml.length;
for (var i=0; i<xml_len; i++) {
  var c = xml.charAt(i);
  if (c == '/' && i+1 < xml_len && xml.charAt(i+1) == '>')
     level--;
  if (c == '<') {
     var next_c = 0;
     if (i+1 < xml_len)
        next_c = xml.charAt(i+1);
     if (next_c == '/')
        level--;
     if (lt_count > 0) {
        out += "\n";
        space_len = level*2;
        for (var j=0; j<space_len; j++)
            out += " ";
     }
     lt_count++;
     if (next_c != '/')
        level++;
  }
  out += c;
}
return out;
}
// Code for evaluateXPath taken from website
// https://developer.mozilla.org/en-US/docs/Using_XPath
//
// Evaluate an XPath expression aExpression against a given DOM node
// or Document object (aNode), returning the results as an array
// thanks wanderingstan at morethanwarm dot mail dot com for the
// initial work.
//
// Modified by "arun at siara dot cc" to evaluate according 
// to result.resultType
XMLUtil.evaluateXPath = function(aNode, aExpr) {
  var xpe = new XPathEvaluator();
  try {
    var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ?
      aNode.documentElement : aNode.ownerDocument.documentElement);
    var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
    var found = [];
    var res;
    switch (result.resultType) {
      case 1:
           found.push(result.numberValue);
           break;
      case 2:
           found.push(result.stringValue);
           break;
      case 3:
           found.push(result.booleanValue);
           break;
      default:
           while (res = result.iterateNext())
              found.push(res);
           break;
    }
  } catch (e) {
    alert(e);
  }
  return found;
}
var CSVParser = function() {
   this.line_no = 1;
   this.col_no = 1;
   return this;
}
CSVParser.encodeToCSVText = function(value) {
   if (value === undefined || value === null)
      return value;
   if (value.indexOf(',') != -1 || value.indexOf('\n') != -1
        || value.indexOf("/*") != -1) {
      if (value.indexOf('"') != -1)
         value = value.replace(new RegExp("\"", "g"), "\"\"");
      value = ("\"" + value + "\"");
   }
   return value;
}
CSVParser.prototype.increment_counters = function(c) {
  if (c == '\n') {
     this.line_no++;
     this.col_no = 1;
  } else
     this.col_no++;
}
CSVParser.prototype.save_counters = function(c) {
  this.save_line_no = this.line_no;
  this.save_col_no = this.col_no;
}
CSVParser.prototype.restore_counters = function(c) {
  this.line_no = this.save_line_no;
  this.col_no = this.save_col_no;
}
CSVParser.prototype.skip_box_comment = function(input, i, isize, looking_for_quote, to_increment_counters) {
  var box_started = false;
  var j;
  for (j=i; j<isize; j++) {
     var c = input.charAt(j);
     if (j < (isize-1)) {
        if (c == '/' && input.charAt(j+1) == '*') {
           box_started = true;
           j++;
           if (to_increment_counters) {
              this.increment_counters(c);
              this.increment_counters(c);
           }
           continue;
        }
        if (c == '*' && input.charAt(j+1) == '/') {
           box_started = false;
           j++;
           if (to_increment_counters) {
              this.increment_counters(c);
              this.increment_counters(c);
           }
           continue;
        }
     }
     if (!box_started) {
        if (looking_for_quote) {
           if (c != ' ' && c != '\t')
              break;
           if (to_increment_counters)
              this.increment_counters(c);
        } else
           break;
     }
  }
  return j;
}
CSVParser.prototype.is_eol = function(input, start, end) {
  var len = end-start-1;
  if (len >= 0 && input.charAt(end-1) == '\n')
     return true;
  if (input.length == (end-1))
     return true;
  return false;
}
CSVParser.prototype.get_token_value = function(input, start, end) {
  var ret = "";
  var is_quote_enclosed = false;
  var i = start;
  var is_quote_end = false;
  for (; i<end; i++) {
     i = this.skip_box_comment(input, i, end, true, false);
     var c = input.charAt(i++);
     if (c == '"')
        is_quote_enclosed = true;
     else
        i = start;
     break;
  }
  for (; i<end; i++) {
    c = input.charAt(i);
    if (is_quote_end) {
       i = this.skip_box_comment(input, i, end, true, false);
       c = input.charAt(i);
       if (c == ',' || c == '\n')
          break;
       if (c != ',' && c != ' ' && c != '\t')
          is_quote_end = false;
    }
    if (is_quote_enclosed) {
       if (c == '"') {
          if (i == end-1) break;
          var c_next = input.charAt(i+1);
          if (c_next == '"') {
             ret += c;
             i++;
             continue;
          }
          is_quote_end = true;
          continue;
       }
    } else {
       i = this.skip_box_comment(input, i, end, false, false);
       c = input.charAt(i);
       if (c == ',' || c == '\n')
          break;
    }
    ret += c;
  }
  return ret;
}
CSVParser.prototype.find_next_token_pos = function(input, isize, prev_pos, ex) {
  var i = prev_pos;
  var is_quote_end = false;
  var is_quote_started = false;
  if (prev_pos == 0) {
     this.line_no = 1;
     this.col_no = 1;
  }
  this.save_counters();
  for (; i<isize; i++) {
     i = this.skip_box_comment(input, i, isize, true, true);
     c = input.charAt(i++); this.increment_counters(c);
     if (c == '"')
        is_quote_started = true;
     else {
        i = prev_pos;
        this.restore_counters();
     }
     break;
  }
  for (; i<isize; i++) {
    c = input.charAt(i);
    if (is_quote_end) {
       i = this.skip_box_comment(input, i, isize, false, true);
       c = input.charAt(i); this.increment_counters(c);
       if (c == ',' || c == '\n') break;
       if (c != ',' && c != ' ' && c != '\t') {
          ex.add_warn(6, this);
          is_quote_end = false;
       }
    }
    if (is_quote_started) {
       if (c == '"') {
          if (i == isize-1) break;
          var c_next = input.charAt(i+1);
          if (c_next == '"') {
             i++;
             this.increment_counters(c_next);
             continue;
          }
          is_quote_end = true;
          continue;
       }
       this.increment_counters(c);
    } else {
       i = this.skip_box_comment(input, i, isize, false, true);
       c = input.charAt(i); this.increment_counters(c);
       if (c == ',' || c == '\n')
          break;
    }
  }
  return i+1;
}
var ExceptionHandler = function() {
   this.lang = "en-US";
   this.error_code = 0;
   this.err_line_no = 0;
   this.err_col_no = 0;
   this.msgs = {};
   this.msgs["en-US"] = [""
     , "Schema definition cannot begin with a space"
     , "Duplicate node definition"
     , "Cannot go down two levels"
     , "Too many characters in a column"
     , "Node not found"
     , "Improperly closed quote"
     , "There can be only one root node"
     ];
   this.warning_codes = new Array();
   this.warning_line_nos = new Array();
   this.warning_col_nos = new Array();
   this.validation_codes = new Array();
   this.validation_line_nos = new Array();
   this.validation_col_nos = new Array();
}
ExceptionHandler.prototype.get_error_message = function() {
   if (this.error_code == 0) return "";
   return "Line:"+this.err_line_no + ", Col:"+this.err_col_no+": "
            + this.msgs[this.lang][this.error_code];
}
ExceptionHandler.prototype.get_warn_messages = function() {
   if (this.warning_codes.length == 0) return "";
   var warn_msgs = "";
   for (var i=0; i<this.warning_codes.length; i++) {
       if (i > 0) warn_msgs += "\r\n";
       warn_msgs += ("Line:"+this.warning_line_nos[i] 
                  + ", Col:"+this.warning_col_nos[i]+": "
                  + this.msgs[this.lang][this.warning_codes[i]]);
   }
   return warn_msgs;
}
ExceptionHandler.prototype.get_val_messages = function() {
   if (this.validation_codes.length == 0) return "";
   var val_msgs = "";
   for (var i=0; i<this.validation_codes.length; i++) {
       if (i > 0) val_msgs += "\r\n";
       val_msgs += ("Line:"+this.validation_line_nos[i] 
                 + ", Col:"+this.validation_col_nos[i]+": "
                 + this.msgs[this.lang][this.validation_codes[i]]);
   }
   return val_msgs;
}
ExceptionHandler.prototype.add_err = function(err_code, csv_parser) {
   this.error_code = err_code;
   this.err_line_no = csv_parser.line_no;
   this.err_col_no = csv_parser.col_no;
}
ExceptionHandler.prototype.add_warn = function(warn_code, csv_parser) {
   this.warning_codes[this.warning_codes.length] = warn_code;
   this.warning_line_nos[this.warning_line_nos.length] = csv_parser.line_no;
   this.warning_col_nos[this.warning_col_nos.length] = csv_parser.col_no;
}
ExceptionHandler.prototype.add_val_err = function(val_code, csv_parser) {
   this.validation_codes[this.validation_codes.length] = val_code;
   this.validation_line_nos[this.validation_line_nos.length] = csv_parser.line_no;
   this.validation_col_nos[this.validation_col_nos.length] = csv_parser.col_no;
}
ExceptionHandler.prototype.display_exceptions = function() {
   var err_msg = this.get_error_message();
   if (err_msg != "") alert("Error:\n"+err_msg);
   var warn_msg = this.get_warn_messages();
   if (warn_msg != "") alert("Warning(s):\n"+warn_msg);
   var val_msg = this.get_val_messages();
   if (val_msg != "") alert("Validation Error(s):\n"+val_msg);
   if (err_msg != "") return true;
   return false;
}
var CSV_ML_Schema = function() {
   this.node_objects = { };
   this.node_seq_objects = { };
}
var CSV_ML_Parser = function(csv, max_val_len) {
   this.csv_str = csv;
   this.max_value_len = 65535;
   if (max_val_len !== undefined && max_val_len != null)
      this.max_value_len = max_val_len;
   this.csv_ml_ver = "1.0";
   this.csv_ml_root = "root";
   this.csv_ml_node_name = "no_node_name";
   this.csv_ml_schema = "no_schema";
   this.csv_ml_encoding = "UTF-8";
   this.cur_sibling = 1;
   this.csv_parser = new CSVParser();
   this.schema = new CSV_ML_Schema();
   this.ex = new ExceptionHandler();
   return this;
}
CSV_ML_Parser.prototype.parse_directive = function() {
   var cur_pos = 0;
   var nxt_pos;
   var token_ctr = 0;
   var to_continue = true;
   do {
      nxt_pos = this.csv_parser.find_next_token_pos(this.csv_str, this.csv_str.length, cur_pos, this.ex);
      if (nxt_pos-cur_pos > this.max_value_len) {
         this.ex.add_err(4, this.csv_parser);
         return cur_pos;
      }
      var is_eol = this.csv_parser.is_eol(this.csv_str, cur_pos, nxt_pos);
      var value = this.csv_parser.get_token_value(this.csv_str, cur_pos, nxt_pos);
      value = value.trim().toLowerCase();
      if (token_ctr == 0 && value == "" && is_eol) {
         cur_pos = nxt_pos;
         continue;
      }
      switch (token_ctr) {
        case 0:
             if (value == "csv_ml") {
                this.csv_ml_node_name = "with_node_name";
                this.csv_ml_schema = "inline";
             } else
                to_continue = false;
             break;
        case 1:
             this.csv_ml_ver = value;
             break;
        case 2:
             if (value != "")
                this.csv_ml_encoding = value;
             break;
        case 3:
             if (value != "")
                this.csv_ml_root = value;
             break;
        case 4:
             if (value == "no_node_name")
                this.csv_ml_node_name = value;
             break;
        case 5:
             if (value == "no_schema")
                this.csv_ml_schema = value;
             break;
      }
      if (this.csv_parser.is_eol(this.csv_str, cur_pos, nxt_pos))
         to_continue = false;
      cur_pos = nxt_pos;
      if (to_continue) token_ctr++;
   } while (to_continue);
   return (token_ctr==0?0:nxt_pos);
}
CSV_ML_Parser.prototype.remove_from_seq_path = function(cur_sequence_path) {
   var idx = cur_sequence_path.lastIndexOf(".");
   if (idx == -1) {
      cur_sequence_path = "";
      if (this.csv_ml_schema != "no_schema" || 
           this.csv_ml_node_name == "with_node_name")
         this.cur_sibling++;
   } else {
      if (this.csv_ml_schema != "no_schema" || 
           this.csv_ml_node_name == "with_node_name")
         this.cur_sibling = 1+parseInt(cur_sequence_path.substring(idx+1));
      cur_sequence_path = cur_sequence_path.substring(0, idx);
   }
   return cur_sequence_path;
}
CSV_ML_Parser.prototype.remove_from_path = function(cur_path) {
   var idx = cur_path.lastIndexOf(".");
   if (idx == -1)
      cur_path = "";
   else
      cur_path = cur_path.substring(0, idx);
   return cur_path;
}
CSV_ML_Parser.prototype.add_to_seq_path = function(cur_sequence_path, cur_sibling) {
   if (cur_sequence_path != "") {
      cur_sequence_path += ".";
   }
   cur_sequence_path += cur_sibling;
   return cur_sequence_path;
}
CSV_ML_Parser.prototype.add_to_path = function(cur_path, node_name) {
   if (cur_path != "") {
      cur_path += "."
   }
   cur_path += node_name;
   return cur_path;
}
CSV_ML_Parser.prototype.deduce_column_state = function(c, cur_state) {
   if (c == '/') cur_state = this.ST_SCH_COL_ALIAS; else
   if (c == '(') cur_state = this.ST_SCH_COL_LEN; else
   if (c == ')') cur_state = this.ST_SCH_COL_TYPE; else
   if (c == '=') cur_state = this.ST_SCH_COL_DEF; else
   if (c == '{') cur_state = this.ST_SCH_COL_VAL; else
   if (c == '}') cur_state = 999;
   return cur_state;
}
CSV_ML_Parser.prototype.parse_column_schema = function(value, column_obj) {
   this.ST_SCH_COL_NAME = 1;
   this.ST_SCH_COL_ALIAS = 2;
   this.ST_SCH_COL_ARR = 3;
   this.ST_SCH_COL_LEN = 4;
   this.ST_SCH_COL_TYPE = 5;
   this.ST_SCH_COL_DEF = 6;
   this.ST_SCH_COL_VAL = 7;
   cur_state = this.ST_SCH_COL_NAME;
   column_obj["name"] = "";
   column_obj["ns"] = "";
   column_obj["alias"] = "";
   column_obj["len"] = "";
   column_obj["type"] = "";
   column_obj["values"] = "";
   for (var j=0; j<value.length; j++) {
       var c = value.charAt(j);
       switch (cur_state) {
         case this.ST_SCH_COL_NAME:
              cur_state = this.deduce_column_state(c, cur_state);
              if (cur_state == this.ST_SCH_COL_NAME)
                 column_obj["name"] += c;
              break;
         case this.ST_SCH_COL_ALIAS:
              cur_state = this.deduce_column_state(c, cur_state);
              if (cur_state == this.ST_SCH_COL_ALIAS)
                 column_obj["alias"] += c;
              break;
         case this.ST_SCH_COL_LEN:
              cur_state = this.deduce_column_state(c, cur_state);
              if (cur_state == this.ST_SCH_COL_LEN)
                 column_obj["len"] += c;
              break;
         case this.ST_SCH_COL_TYPE:
              cur_state = this.deduce_column_state(c, cur_state);
              if (cur_state == this.ST_SCH_COL_TYPE)
                 column_obj["type"] += c;
              break;
         case this.ST_SCH_COL_DEF:
              cur_state = this.deduce_column_state(c, cur_state);
              if (cur_state == this.ST_SCH_COL_DEF)
                 column_obj["default"] += c;
              break;
         case this.ST_SCH_COL_VAL:
              cur_state = this.deduce_column_state(c, cur_state);
              if (cur_state == this.ST_SCH_COL_VAL)
                 column_obj["values"] += c;
              break;
       }
       if (cur_state == this.ST_SCH_COL_DEF) {
          if (column_obj["default"] === undefined)
             column_obj["default"] = "";
       }
   }
   if (column_obj["len"] == "")
      column_obj["len"] = "0";
   if (column_obj["default"] === undefined)
      column_obj["default"] = null;
   if (column_obj["values"] == "") {
      column_obj["values"] = new Array();
      column_obj["values"][0] = "";
   } else {
      var i = 0;
      var nxt_pos = 0;
      var cur_pos = 0;
      var val_csv = column_obj["values"];
      column_obj["values"] = new Array();
      var parser = new CSV();
      while (nxt_pos < val_csv.length) {
         nxt_pos = parser.find_next_token_pos(val_csv, val_csv.length, cur_pos, this.ex); // will affect line numbers?
         if (nxt_pos-cur_pos > this.max_value_len) {
            this.ex.add_err(4, this.csv_parser);
            return;
         }
         var value = parser.get_token_value(val_csv, cur_pos, nxt_pos);
         column_obj["values"][i++] = value;
         cur_pos = nxt_pos;
      }
   }
   var c_idx = column_obj["name"].indexOf(":");
   if (c_idx != -1) {
      column_obj["ns"] = column_obj["name"].substring(0, c_idx);
      column_obj["name"] = column_obj["name"].substring(c_idx+1);
   }
}
CSV_ML_Parser.prototype.parse_schema = function(cur_pos) {
   var l = 0;
   this.ST_SCH_NODE = 0;
   var cur_path = "";
   var cur_sequence_path = "";
   cur_level = 0;
   this.cur_sibling = 1;
   var column_arr = undefined;
   var nxt_pos;
   var len = this.csv_str.length;
   var cur_state = this.ST_SCH_NODE;
   var token_ctr = 0;
   var to_continue = true;
   var is0def = false;
   var is0ref = false;
   var prev_node_obj = null;
   var node_ctr = 1;
   var zero_def_name = "";
   if (this.csv_str.charAt(cur_pos)==' ' || this.csv_str.charAt(cur_pos)=='\t') {
      this.ex.add_err(1, this.csv_parser);
      return cur_pos;
   }
   do {
      nxt_pos = this.csv_parser.find_next_token_pos(this.csv_str, this.csv_str.length, cur_pos, this.ex);
      if (nxt_pos-cur_pos > this.max_value_len) {
         this.ex.add_err(4, this.csv_parser);
         return cur_pos;
      }
      var is_eol = this.csv_parser.is_eol(this.csv_str, cur_pos, nxt_pos);
      var value = this.csv_parser.get_token_value(this.csv_str, cur_pos, nxt_pos);
      if (value.charAt(0) == '0' && token_ctr == 0) {
         if (cur_level == 0) {
            is0def = true;
            zero_def_name = value.trim();
            token_ctr--;
         }
         if (cur_level > 0)
            is0ref = true;
      }
      if (token_ctr == 0 && !is0ref) {
         var node_name = value.trim();
         if (node_name.indexOf(" ") != -1)
            node_name = node_name.replace(new RegExp(" ", "g"), "_");
         if (node_name == "" && is_eol) {
            cur_pos = nxt_pos;
            continue;
         }
         if (this.csv_ml_node_name == "no_node_name") {
            node_name = "n"+node_ctr;
            node_ctr++;
         }
         if (cur_level == 0) {
            if (node_name == "end_schema")
               return nxt_pos;
            var c = node_name.charAt(0);
            if (c >= '1' && c <= '9')
               return cur_pos;
         }
         if (is0def) {
            cur_sequence_path = zero_def_name;
            cur_path = zero_def_name;
         } else {
            cur_sequence_path = this.add_to_seq_path(cur_sequence_path, this.cur_sibling);
            cur_path = this.add_to_path(cur_path, node_name);
         }
         var node_obj = { };
         prev_node_obj = node_obj;
         node_obj["name"] = node_name;
         node_obj["path"] = cur_path;
         node_obj["columns"] = new Array();
         node_obj["seq_path"] = cur_sequence_path;
         node_obj["zero_children"] = new Array();
         column_arr = node_obj["columns"];
         if (this.schema.node_objects[cur_path] !== undefined) {
            this.ex.add_err(2, this.csv_parser);
            return cur_pos;
         }
         this.schema.node_objects[cur_path] = node_obj;
         this.schema.node_seq_objects[cur_sequence_path] = node_obj;
         if (this.csv_ml_node_name == "no_node_name") {
            column_arr[0] = { };
            this.parse_column_schema(value, column_arr[0]);
         }
      } else
      if (token_ctr > 0 && !is0ref) {
         var idx = token_ctr-1;
         if (this.csv_ml_node_name == "no_node_name")
            idx++;
         column_arr[idx] = { };
         this.parse_column_schema(value, column_arr[idx]);
      }
      if (is0ref) {
         prev_node_obj["zero_children"][token_ctr] = value.trim();
      }
      token_ctr++;
      if (is_eol) {
         var space_count = 0;
         while (this.csv_str.charAt(nxt_pos)==' ' 
                || this.csv_str.charAt(nxt_pos)=='\t') {
            space_count++;
            nxt_pos++;
         }
         this.csv_parser.col_no += space_count;
         if (space_count > (cur_level+1)) {
            this.ex.add_err(3, this.csv_parser);
            return cur_pos;
         } else {
            while (cur_level >= space_count) {
               if (!is0def && !is0ref) {
                  cur_path = this.remove_from_path(cur_path);
                  cur_sequence_path = this.remove_from_seq_path(cur_sequence_path);
               }
               cur_level--;
            }
            cur_level++;
         }
         if (this.csv_ml_node_name == "no_node_name" && space_count == 0)
            return nxt_pos;
         if (is0def || is0ref) {
            cur_path = "";
            cur_sequence_path = "";
         }
         is0def = false;
         is0ref = false;
         token_ctr = 0;
      }
      cur_pos = nxt_pos;
   } while (to_continue);
   return cur_pos;
}
CSV_ML_Parser.prototype.delete_parent_refs = function(obj) {
   for (var key in obj) {
      if (key == "parent_ref")
         delete obj[key];
      else
      if (typeof(obj[key]) == "array") {
         for (var ele in obj[key])
             this.delete_parent_refs(ele);
      } else
      if (typeof(obj[key]) == "object") {
         this.delete_parent_refs(obj[key]);
      }
   }
}
CSV_ML_Parser.prototype.add_new_node = function(dom_or_jso, obj_out, cur_node, node_name) {
   var new_node = null;
   if (dom_or_jso == "dom") {
      var to_create_new_element = true;
      if (cur_node.parentNode != null
           && cur_node.parentNode.nodeType == 9
           && node_name == this.csv_ml_root) {
         to_create_new_element = false;
      }
      if (to_create_new_element) {
         new_node = obj_out.createElement(node_name);
         if (cur_node.parentNode == null)
            this.ex.add_err(7, this.csv_parser);
         else
            cur_node.appendChild(new_node);
      } else {
         new_node = cur_node;
      }
   } else {
      if (cur_node[cur_node_name] === undefined)
         cur_node[cur_node_name] = new Array();
      var cur_node_len = cur_node[cur_node_name].length;
      new_node = { };
      cur_node[cur_node_name][cur_node_len] = new_node;
      new_node["parent_ref"] = cur_node;
   }
   return new_node;
}
CSV_ML_Parser.prototype.parse = function(dom_or_jso, to_validate) {
   this.error_code = 0;
   this.warning_codes = new Array();
   this.validation_codes = new Array();
   var i = this.parse_directive();
   if (this.error_code != 0)
      return this.error_code;
   if (this.csv_ml_schema == "inline")
      i = this.parse_schema(i);
   if (this.error_code != 0)
      return this.error_code;
   cur_level = 0;
   var cur_pos = i;
   var nxt_pos;
   var node_ctr = 1;
   var len = this.csv_str.length;
   var token_ctr = 0;
   var to_continue = true;
   var cur_path = "";
   var cur_sequence_path = "";
   var obj_out = null;
   this.cur_sibling = 1;
   var is0def = false;
   var zero_def_name = "";
   if (dom_or_jso == "dom") {
      var namespace = "";
      var ns_uri = [];
      var e_idx = this.csv_ml_root.indexOf("/");
      if (e_idx > 0) {
         ns_uri = this.csv_ml_root.substring(e_idx+1).split(" ");
         this.csv_ml_root = this.csv_ml_root.substring(0, e_idx);
      }
      var xml_str = "<"+this.csv_ml_root;
      var c_idx = this.csv_ml_root.indexOf(":");
      if (c_idx > 0) {
         namespace = this.csv_ml_root.substring(0, c_idx);
         if (ns_uri.length == 0)
            ns_url = [namespace+"='http://siara.cc/ns'"];
      }
      for (var i=0; i<ns_uri.length; i++)
         xml_str += (" xmlns:"+ns_uri[i]);
      xml_str += ("></"+this.csv_ml_root+">");
      obj_out = XMLUtil.parseXMLToDOM(xml_str);
   } else
      obj_out = { };
   cur_node = (dom_or_jso=="dom"?obj_out.documentElement:obj_out);
   cur_node_schema = undefined;
   do {
      nxt_pos = this.csv_parser.find_next_token_pos(this.csv_str, len, cur_pos, this.ex);
      if (nxt_pos-cur_pos > this.max_value_len) {
         this.ex.add_err(4, this.csv_parser);
         return cur_pos;
      }
      var is_eol = this.csv_parser.is_eol(this.csv_str, cur_pos, nxt_pos);
      var value = this.csv_parser.get_token_value(this.csv_str, cur_pos, nxt_pos);
      if (value.charAt(0) == '0' && token_ctr == 0) {
         if (cur_level == 0) {
            is0def = true;
            zero_def_name = value.trim();
            token_ctr--;
         }
      }
      if (token_ctr == 0) {
         if (value.trim() == "" && is_eol) {
            cur_pos = nxt_pos;
            continue;
         }
         if (this.csv_ml_schema == "no_schema") {
            cur_sequence_path = this.add_to_seq_path(cur_sequence_path, this.cur_sibling);
            cur_node_schema = this.schema.node_seq_objects[cur_sequence_path];
            if (cur_node_schema === undefined || cur_node_schema == null) {
               if (this.csv_ml_node_name == "with_node_name")
                  cur_node_name = value;
               else
                  cur_node_name = "n"+node_ctr;
               cur_node_schema = {"name": cur_node_name, "columns": []};
               this.schema.node_seq_objects[cur_sequence_path] = cur_node_schema;
               node_ctr++;
            } else {
               cur_node_name = cur_node_schema["name"];
            }
            cur_node = this.add_new_node(dom_or_jso, obj_out, cur_node, cur_node_name);
            if (this.csv_ml_node_name == "no_node_name") {
               token_ctr++;
               continue;
            }
         } else {
            var c = value.charAt(0);
            if (this.csv_ml_node_name == "no_node_name") {
               c = '1';
               value = '1';
            }
            if (c == '0') {
               cur_sequence_path = zero_def_name;
               cur_node_schema = this.schema.node_seq_objects[value];
               if (cur_node_schema === undefined) {
                  this.ex.add_err(5, this.csv_parser);
                  return cur_pos;
               }
               // TODO: Validate whether valid child or not
               cur_path = cur_node_schema["path"];
            } else
            if (c >= '1' && c <= '9') {
               cur_sequence_path = this.add_to_seq_path(cur_sequence_path, parseInt(value));
               cur_node_schema = this.schema.node_seq_objects[cur_sequence_path];
               if (cur_node_schema === undefined) {
                  this.ex.add_err(5, this.csv_parser);
                  return cur_pos;
               }
               cur_path = cur_node_schema["path"];
            } else {
               cur_path = this.add_to_path(cur_path, value);
               cur_node_schema = this.schema.node_objects[cur_path];
               if (cur_node_schema === undefined) {
                  this.ex.add_err(5, this.csv_parser);
                  return cur_pos;
               }
               cur_sequence_path = cur_node_schema["seq_path"];
            }
            cur_node_name = cur_node_schema["name"];
            cur_node = this.add_new_node(dom_or_jso, obj_out, cur_node, cur_node_name);
            if (this.csv_ml_node_name == "no_node_name") {
               token_ctr++;
               continue;
            }
         }
      } else
      if (token_ctr > 0) {
         var column_arr = cur_node_schema["columns"];
         var arr_len = column_arr.length;
         if (this.csv_ml_schema != "no_schema" && token_ctr > arr_len) {
            value = CSVParser.encodeToCSVText(value);
            if (dom_or_jso == "dom") {
               if (cur_node.textContent != "")
                  cur_node.textContent += ",";
               cur_node.textContent += value;
            } else {
               if (cur_node["_content"] === undefined)
                  cur_node["_content"] = value;
               else
                  cur_node["_content"] += (","+value);
            }
         } else {
            var col_name = "";
            if (this.csv_ml_schema == "no_schema") {
               col_name = "c"+token_ctr;
            } else
               col_name = column_arr[token_ctr-1]["name"];
            if (col_name.indexOf(" ") != -1)
               col_name = col_name.replace(new RegExp(" ", "g"), "_");
            if (dom_or_jso == "dom")
               cur_node.setAttribute(col_name, value);
            else
               cur_node[col_name] = value;
         }
      }
      token_ctr++;
      if (is_eol) {
         var column_arr = cur_node_schema["columns"];
         var arr_len = column_arr.length;
         while (token_ctr <= arr_len) {
            if (dom_or_jso == "dom") {
               var col_name = column_arr[token_ctr-1]["name"];
               if (col_name.indexOf("xmlns:") != 0)
                  cur_node.setAttribute(col_name, "");
            } else
               cur_node[column_arr[token_ctr-1]["name"]] = "";
            token_ctr++;
         }
         var space_count = 0;
         while (this.csv_str.charAt(nxt_pos) == ' ' 
                || this.csv_str.charAt(nxt_pos) == '\t') {
            space_count++;
            nxt_pos++;
         }
         this.csv_parser.col_no += space_count;
         if (space_count > (cur_level+1)) {
            this.ex.add_err(3, this.csv_parser);
            return obj_out;
         } else {
            var to_go_up = false;
            while (cur_level >= space_count) {
               if (!is0def) {
                  cur_path = this.remove_from_path(cur_path);
                  cur_sequence_path = this.remove_from_seq_path(cur_sequence_path);
               }
               if (dom_or_jso == "dom") {
                  cur_node = cur_node.parentNode;
                  if (cur_node == null)
                     cur_node = obj_out.documentElement;
               } else
                  cur_node = cur_node["parent_ref"];
               cur_level--;
            }
            cur_level++;
         }
         if (is0def) {
            cur_path = "";
            cur_sequence_path = "";
         }
         is0def = false;
         token_ctr = 0;
      }
      cur_pos = nxt_pos;
   } while (cur_pos < len);
   if (dom_or_jso == "jso")
      this.delete_parent_refs(obj_out);
   return obj_out;
}
CSV_ML_Parser.prototype.get_schema = function() {
   return this.schema.node_objects;
}
var CSV_ML_Output = function() {
}
CSV_ML_Output.generate = function(dom) {
   var out_obj = {"schema": "csv_ml,1.0\n", "data": ""};
   CSV_ML_Output.outputCSVRecursively(dom.documentElement, out_obj, "");
   return out_obj["schema"]+"end_schema\n"+out_obj["data"];
}
CSV_ML_Output.outputCSVRecursively = function(ele, out_obj, hierarchy_space_prefix) {
   var node_name = ele.nodeName;
   var is_schema_updated = false;
   if (out_obj["schema"].indexOf("\n"+hierarchy_space_prefix+node_name+",") != -1)
      is_schema_updated = true;
   if (ele.parentNode.parentNode !== null) {
      if (!is_schema_updated) out_obj["schema"] += hierarchy_space_prefix+node_name;
      out_obj["data"] += hierarchy_space_prefix+node_name;
      for (var j=0; j<ele.attributes.length; j++) {
         if (!is_schema_updated)
            out_obj["schema"] += ","+ele.attributes[j].name;
         out_obj["data"] += ","+CSVParser.encodeToCSVText(ele.attributes[j].value);
      }
      if (ele.textContent != "")
         out_obj["data"] += ","+CSVParser.encodeToCSVText(ele.textContent);
      if (!is_schema_updated)
         out_obj["schema"] += "\n";
      out_obj["data"] += "\n";
      hierarchy_space_prefix += " ";
   }
   for (var i=0; i<ele.childNodes.length; i++) {
      if (ele.childNodes[i].nodeType != 1)
         continue;
      CSV_ML_Output.outputCSVRecursively(ele.childNodes[i], out_obj, hierarchy_space_prefix);
   }
}
var CSV_ML_Script = function() {
}
CSV_ML_Script.generateDDL = function(node_objects) {
   var out_str = "";
   var is_first = true;
   var is_id_present = false;
   var is_parent_id_present = false;
   for (var key in node_objects) {
      out_str += "CREATE TABLE ";
      out_str += node_objects[key]["name"];
      out_str += " (";
      var col_arr_len = node_objects[key]["columns"].length;
      for (var j=0; j<col_arr_len; j++) {
         var col_obj = node_objects[key]["columns"][j];
         if (is_first)
            is_first = false;
         else
            out_str += ", ";
         var col_name = col_obj["name"];
         var col_type = col_obj["type"];
         var col_default = col_obj["default"];
         if (col_type == "")
            col_type = "text";
         var col_len = col_obj["len"];
         out_str += col_name;
         out_str += " ";
         out_str += col_type;
         if (col_len != "0")
            out_str += ("("+col_len+")");
         if (col_default == null) {
            out_str += " NOT NULL";
         } else {
            if (col_default != "null")
               out_str += (" DEFAULT '" + col_default.replace(new RegExp("\'", "g"), "''") + "'");
         }
         if (col_name == "id") {
            is_id_present = true;
            out_str += " primary key autoincrement";
         }
         if (col_name == "parent_id")
            is_parent_id_present = true;
      }
      if (!is_id_present)
         out_str += ", id integer primary key autoincrement";
      if (!is_parent_id_present && key.indexOf(".") != -1)
         out_str += ", parent_id integer";
      out_str += ");\r\n\r\n";
      is_first = true;
   }
   return out_str;
}
CSV_ML_Script.generate_dml_recursively = function(node_objects, ele, path) {
   var out_str = "";
   if (path != "") {
      var node_name = ele.nodeName;
      var id_value = ele.getAttribute("id");
      if (id_value == null || id_value == "") {
         out_str += "INSERT INTO ";
         out_str += node_name;
         out_str += " (";
         var is_first = true;
         var col_arr = node_objects[path]["columns"];
         for (var j=0; j<col_arr.length; j++) {
            var col_name = col_arr[j]["name"];
            if (col_name == "id") continue;
            if (is_first)
               is_first = false;
            else
               out_str += ", ";
            out_str += col_name;
         }
         var last_dot_idx = path.lastIndexOf('.');
         if (last_dot_idx != -1 && ele.getAttribute("parent_id") == null) {
            out_str += ", parent_id";
         }
         out_str += ") VALUES (";
         is_first = true;
         for (var j=0; j<col_arr.length; j++) {
            var col_name = col_arr[j]["name"];
            if (col_name == "id") continue;
            if (is_first)
               is_first = false;
            else
               out_str += ", ";
            out_str += ("'"+ele.getAttribute(col_name).replace(new RegExp("\'", "g"), "''")+"'");
         }
         if (last_dot_idx != -1 && ele.getAttribute("parent_id") == null) {
            var earlier_dot_idx = path.lastIndexOf('.', last_dot_idx-1);
            var parent_table_name = "";
            if (earlier_dot_idx == -1)
               parent_table_name = path.substring(0, last_dot_idx);
            else
               parent_table_name = path.substring(earlier_dot_idx+1, last_dot_idx);
            out_str += ", (select seq from sqlite_sequence where name='";
            out_str += parent_table_name;
            out_str += "')";
         }
         out_str += ");\r\n\r\n";
      } else {
         if (id_value.charAt(0) == '*') {
            out_str += "DELETE FROM ";
            out_str += node_name;
            id_value = id_value.substring(1);
         } else {
            out_str += "UPDATE ";
            out_str += node_name;
            out_str += " SET ";
            var is_first = true;
            var col_arr = node_objects[path]["columns"];
            for (var j=0; j<col_arr.length; j++) {
               if (col_arr[j]["name"] == "id") continue;
               if (is_first)
                  is_first = false;
               else
                  out_str += ", ";
               out_str += col_arr[j]["name"];
               out_str += " = ";
               out_str += ("'"+ele.getAttribute(col_arr[j]["name"]).replace(new RegExp("\'", "g"), "''")+"'");
            }
         }
         out_str += " WHERE id=";
         out_str += id_value;
         out_str += ";\r\n\r\n";
      }
   }
   for (var i=0; i<ele.childNodes.length; i++) {
      if (ele.childNodes[i].nodeType != 1)
         continue;
      var cur_path = path;
      if (cur_path != "") cur_path += ".";
      cur_path += ele.childNodes[i].nodeName;
      out_str += CSV_ML_Script.generate_dml_recursively(node_objects, ele.childNodes[i], cur_path);
   }
   return out_str;
}

module.exports = {
   CSV_ML_Parser: CSV_ML_Parser,
   CSVParser: CSVParser,
   XMLUtil: XMLUtil,
   CSV_ML_Output: CSV_ML_Output,
   CSV_ML_Script: CSV_ML_Script,
   CSV_ML_Schema: CSV_ML_Schema
}
