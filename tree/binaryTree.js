const { deserialize } = require("v8");

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  traverse() {
    if (!this.root) return null;

    const result = [];

    function serializeNode(node) {
      if (node === null) {
        result.push("null");
      } else {
        result.push(node.val);
        serializeNode(node.left);
        serializeNode(node.right);
      }
    }

    serializeNode(this.root);

    return result.filter((val) => val !== "null");
  }

  minDepth() {
    if (!this.root) return 0;
    let queue = [[this.root, 1]];

    while (queue.length > 0) {
      const [current, depth] = queue.shift();
      if (!current.left && !current.right) return depth;
      if (current.left) queue.push([current.left, depth + 1]);
      if (current.right) queue.push([current.right, depth + 1]);
    }
  }

  maxDepth() {
    if (!this.root) return 0;
    let queue = [[this.root]];
    let depth = 1;

    while (queue[0]) {
      const [current] = queue.pop();
      if (current.left || current.right) depth++;
      if (current.right) queue.push([current.right]);
      if (current.left) queue.push([current.left]);
    }

    return depth;
  }

  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      if (node === null) return 0;
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      const currentSum = node.val + leftSum + rightSum;
      result = Math.max(result, currentSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSumHelper(this.root);
    return result;
  }

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let current = this.root;
    let nextLargerValue = null;
    let stack = [];

    while (current || stack.length) {
      while (current) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      if (current.val > lowerBound) {
        if (nextLargerValue === null || current.val < nextLargerValue) {
          nextLargerValue = current.val;
        }
      }

      current = current.right;
    }

    return nextLargerValue;
  }

  areCousins(node1, node2) {
    if (!this.root) return false;

    const queue = [{ node: this.root, parent: null, level: 0 }];
    let node1Parent = null;
    let node2Parent = null;
    let node1Level = null;
    let node2Level = null;

    while (queue.length > 0) {
      const { node, parent, level } = queue.shift();

      if (node === node1) {
        node1Parent = parent;
        node1Level = level;
      } else if (node === node2) {
        node2Parent = parent;
        node2Level = level;
      }

      if (node1Parent !== null && node2Parent !== null) break;

      if (node.left) {
        queue.push({ node: node.left, parent: node, level: level + 1 });
      }
      if (node.right) {
        queue.push({ node: node.right, parent: node, level: level + 1 });
      }
    }

    return node1Level === node2Level && node1Parent !== node2Parent;
  }

  static serialize(tree) {
    if (!tree.root) {
      return "null"; // Represent an empty tree as "null".
    }

    const result = [];

    function serializeNode(node) {
      if (node === null) {
        result.push("null");
      } else {
        result.push(node.val.toString());
        serializeNode(node.left);
        serializeNode(node.right);
      }
    }

    serializeNode(tree.root);

    return result.join(",");
  }

  static deserialize(string) {
    const values = string.split(",");
    let index = 0;

    function deserializeNode() {
      if (values[index] === "null") {
        index++;
        return null;
      }

      const value = parseInt(values[index]);
      index++;

      const node = new Node(value);
      node.left = deserializeNode();
      node.right = deserializeNode();

      return node;
    }

    const root = deserializeNode();
    return new BinaryTree(root);
  }

  lowestCommonAncestor(node1, node2) {
    if (
      !this.root ||
      !this.findNode(this.root, node1) ||
      !this.findNode(this.root, node2)
    ) {
      return null; // One or both of the nodes don't exist in the tree.
    }

    function findLCA(node, nodeA, nodeB) {
      if (node === null) return null;
      if (node === nodeA || node === nodeB) return node;
      const leftLCA = findLCA(node.left, nodeA, nodeB);
      const rightLCA = findLCA(node.right, nodeA, nodeB);
      if (leftLCA && rightLCA) return node;
      return leftLCA || rightLCA;
    }
    return findLCA(this.root, node1, node2);
  }

  findNode(node, target) {
    if (node === null) return false;
    if (node === target) return true;
    return (
      this.findNode(node.left, target) || this.findNode(node.right, target)
    );
  }
}

const initRandNum = () => Math.floor(Math.random() * 10);

const createBinaryTree = (size) => {
  const root = new Node(initRandNum());

  for (let i = 0; i < size; i++) {
    let currentNode = root;
    const newNode = new Node(initRandNum());

    while (true) {
      if (initRandNum() < initRandNum()) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          break;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  return new BinaryTree(root);
};

const myBinaryTree = createBinaryTree(10 - 1);
const string = BinaryTree.serialize(myBinaryTree);
const newTree = BinaryTree.deserialize(string);
const myTree = newTree.traverse();

console.log("tree values", myTree, "size", myTree.length);

module.exports = { BinaryTree, Node };
