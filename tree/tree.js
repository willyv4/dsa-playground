class Node {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  traverse() {
    let arr = [];
    let stack = [this.root];

    while (stack.length) {
      const { val, children } = stack.pop();
      arr.push(val);
      children.forEach((child) => stack.push(child));
    }

    return arr;
  }

  countEvens() {
    if (!this.root) return 0;
    let count = 0;
    let stack = [this.root];

    while (stack.length) {
      const { val, children } = stack.pop();
      if (val % 2 === 0) count++;
      children.forEach((child) => stack.push(child));
    }

    return count;
  }

  sumValues() {
    if (!this.root) return 0;
    let sum = 1;
    let stack = [this.root];

    while (stack.length) {
      const { children } = stack.pop();
      for (let child of children) {
        sum += child.val;
        stack.push(child);
      }
    }
    return sum;
  }

  numGreater(x) {
    if (!this.root) return 0;
    let sum = 0;
    let stack = [this.root];

    while (stack.length) {
      const { val, children } = stack.pop();
      if (val > x) sum++;
      children.forEach((child) => stack.push(child));
    }

    return sum;
  }
}

const initRandomNum = () => Math.floor(Math.random() * 10);

const createTree = () => {
  const root = new Node(initRandomNum());

  for (let i = 0; i < 10; i++) {
    const randomNum = Math.floor(initRandomNum()) + 1;

    if (i < 3) {
      root.children.push(new Node(randomNum));
    } else if (i < 6) {
      root.children[i - 3].children.push(new Node(randomNum));
    } else {
      if (root.children[i - 6]) {
        if (root.children[i - 6].children[i - 6])
          root.children[i - 6].children[i - 6].children.push(
            new Node(randomNum)
          );
      }
    }
  }

  return new Tree(root);
};

const myTree = createTree();
console.log("The Treem", myTree);
console.log("values in tree", myTree.traverse());
console.log("summed values", myTree.sumValues());
console.log("even number count", myTree.countEvens());
console.log("greater than x", myTree.numGreater(3));

module.exports = { Node, Tree };
