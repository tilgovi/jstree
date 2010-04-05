

// Basic structure
// {root:node, size:587, }

// node structure
// Parent reference must be lazy loaded on deserialized trees and must be funciton to avoid
// circular references during serialization.
{left:{}, right:{}, values:[], key:'saf', size:59,
 parent: function (){return parent;}, 
 range: function (end) {return [array of nodes]},
 
 }

// tree methods
// range(start, end) // returns array of nodes
// store(tree)
// insert(key, value) // if key already exists it will be added.
// bulkInsert([[key, value], [key, value]]) // perform bulk add, can be optimized for the least amount of traversal
// find(key) // returns node
// remove(key, value) // remove this value from this key
// removeNode(key) // remove and entire node regardless of the number of values

// node methods
// parent() 
// range(end) // return array of nodes

var createNode = function (parent, node) {
  var node = node || {};
  node.values = node.values || [];
  node.size = 1;
  node.insertNode = function (n) {
    if (n.key === node.key) {
      throw "Node with identical key cannot be inserted."
    }
    if (n.key < node.key) {
      if (!node.left) {
        node.left = n;
        n.reParent(node);
      } else {
        if (node.left.key === n.key) {
          throw "Node with identical key cannot be inserted."
        }
        if (node.left.key > n.key) {
          node.left.insertNode(n);
        } else {
          n.insertNode(node.left);
          node.left = n;
          n.reParent(node)
          node.left;
        }
      }
    } else {
      if (!node.right) {
        node.right = n;
        n.reParent(node);
      } else {
        if (node.right.key === n.key) {
          throw "Node with identical key cannot be inserted."
        }
        if (node.right.key < n.key) {
          node.left.insertNode(n);
        } else {
          n.insertNode(node.right);
          node.right = n;
          n.reParent(node);
          node.right;
        }
      }
    }
  }
  node.reParent = function (p) {
    node.parent = function (){return p};
    while (p) {
      p.size = p.right + p.left + 1;
      p = p.parent();
    }
  }
  node.parent = function (){return parent;};
  node.range = function (end) {
    var results = [];
    var traverse = function (key, n) {
      if (n.key <== key) {
        results.push(n);
      }
      if (n.left < key) {
        traverse(key, n.left);
      }
      if (n.right < key) {
        traverse(key, n.right)
      }
    }
    traverse(end, node);
    return node;
  };
}

var createTree(tree) {
  tree = tree || {};
  tree.insert = tree.insert || function (key, value) {
    if (!tree.root) {
      tree.root = createNode(null, {key:key,values:[value]});
      return tree.root;
    }
    var traverse = function (key, n) {
      if (n.key === key) {return n;};
      if (n.left > key) {
        return n;
      } else {
        return traverse(key, n)
      }
    }
    var node = traverse(key, tree.root)
    if (node.key === key) {
      node.values.push(value);
      return node;
    }
    var n = createNode(node, {key:key,values:[value]});
    node.insertNode(n);
    return n;
    
    // while (n.key !== key) {
    //   if (key < n.key) {
    //     if (n.left) {
    //       if (n.left > key) {
    //         var l = n.left;
    //         node = createNode(n, {key:key,right:l});
    //         node.right.parent = function() {return node;};
    //         n.left = node;
    //       } 
    //       n = n.left;
    //     } else {
    //       n = createNode(n, {key:key});
    //     }
    //     n = node.left;
    //   } else {
    //     if (n.right) {
    //       if (n.right < key){
    //         var r = n.right;
    //         node = createNode(n, {key:key,left:r});
    //         node.left.parent = function () {return node;};
    //         n.right = node;
    //       }
    //       n = node.right;
    //     } else {
    //       n = createNode(n, {key:key});
    //     }
    //   } 
    // }
    // n.values.push(value);
    // return n
  }
  tree.find = tree.find || function (key) {
    if (!tree.root)  {return null;}
    var n = tree.root
    while (n.key !== key && n !== null) {
      if (node.key > key) {
        next = node.left || null;
      } else {
        next = node.right || null;
      } 
      if (!next.parent) {
        next.parent = function () {return n;};
      }
    }
    return n;
  }
  tree.remove = tree.remove || function (key, value) {
    var node = tree.find(key);
    if (node) {
      if (node.indexOf(value) !== -1) {
        node.values.splice(node.values.indexOf(value), 1);
      }
    }
  }
  tree.remove = tree.remove || function (key, value) {
    var node = tree.find(key);
    if (node) {
      if (node.indexOf(value) !== -1) {
        node.values.splice(node.values.indexOf(value), 1);
      }
    }
  }
  tree.removeNode = tree.removeNode || function (key) {
    var node = tree.find(key);
    if (node) {
      if (node.indexOf(value) !== -1) {
        node.values.splice(node.values.indexOf(value), 1);
      }
    }
  }
  tree.range = tree.range || function (start, end) {
    if (!tree.root) {return []};
    
    return traverse(start, tree.root).range(end);
  }
}