class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  traverse() {
    let arr = [];
    let curr = this.head;
    while (curr) {
      arr.push(curr.val);
      curr = curr.next;
    }
    return arr;
  }

  push(val) {
    const node = new Node(val);
    if (!this.head) this.head = node;
    if (this.tail) this.tail.next = node;
    this.tail = node;
    this.length++;
  }

  unshift(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    }
    node.next = this.head;
    this.head = node;
    this.length++;
  }

  pop() {
    if (this.length < 1) throw Error("Empty list!!!");
    const popped = this.tail.val;
    let curr = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return popped;
    }
    while (curr.next !== this.tail) curr = curr.next;
    curr.next = null;
    this.tail = curr;
    this.length--;
    return popped;
  }

  shift() {
    if (this.length < 1) throw Error("Empty list!!!");
    const popped = this.head.val;
    this.length > 1
      ? (this.head = this.head.next)
      : ((this.head = null), (this.tail = null));
    this.length--;
    return popped;
  }

  getAt(idx) {
    let curr = this.head;
    let count = 0;
    while (curr) {
      if (count === idx) return curr.val;
      curr = curr.next;
      count++;
    }
  }

  setAt(idx, val) {
    if (idx < 0 || idx > this.length)
      throw new Error(`Invalid index. valid options: 0-${this.length}`);
    let curr = this.head;
    for (let i = 0; i < this.length; i++) {
      if (i === idx) return (curr.val = val);
      curr = curr.next;
    }
  }

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) {
      throw new Error(`Invalid index. valid options: 0-${this.length}`);
    }
    let prevNode;
    let currentNode = this.head;
    const newNode = new Node(val);
    if (idx === 0) return this.unshift(val);
    if (this.length === idx) return this.push(val);
    for (let i = 0; i < this.length; i++) {
      if (i === idx - 1) prevNode = currentNode;
      if (i === idx) {
        prevNode.next = newNode;
        newNode.next = currentNode;
      }
      currentNode = currentNode.next;
    }
    this.length += 1;
  }

  removeAt(idx) {
    if (idx < 0 || idx > this.length) {
      throw new Error(`Invalid index. valid options: 0-${this.length}`);
    }

    let prevNode;
    let currentNode = this.head;
    if (idx === 0) return this.shift();
    if (this.length === idx) return this.pop();
    for (let i = 0; i < this.length; i++) {
      if (i === idx - 1) prevNode = currentNode;
      if (i === idx) {
        prevNode.next = currentNode.next;
        return currentNode.val;
      }
      currentNode = currentNode.next;
    }
    this.length++;
  }

  average() {
    if (this.length < 1) return 0;
    let total = 0;
    let currentNode = this.head;
    while (currentNode) {
      total += currentNode.val;
      currentNode = currentNode.next;
    }
    return total / this.length;
  }

  insertAtTail(val) {
    const node = new Node(val);
    let curr = this.head;

    while (curr.next) {
      curr = curr.next;
    }

    curr.next = node;
  }

  insertAtHead(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    return this.head;
  }
}

module.exports = LinkedList;
