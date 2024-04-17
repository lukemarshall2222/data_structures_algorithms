/* BST in TypeScript */

export class TreeNode<T> {
    val : T | null;
    parent : TreeNode<T> | null;
    right : TreeNode<T> | null;
    left : TreeNode<T> | null;


    constructor(val : T, parent : TreeNode<T> | null=null, right : TreeNode<T> | null=null, left : TreeNode<T> | null=null) {
        this.val = val;
        this.parent = parent;
        this.right = right;
        this.left = left;
    }

    getVal() : T | null {
        return this.val;
    }

    getParent() : TreeNode<T> | null {
        return this.parent;
    }

    getRight() : TreeNode<T> | null {
        return this.right;
    }

    getLeft() : TreeNode<T> | null {
        return this.left;
    }

    setVal(val : T) : void {
        this.val = val;
    }

    setParent(parent : TreeNode<T> | null) : void {
        this.parent = parent;
    }

    setRight(right : TreeNode<T> | null) : void {
        this.right = right;
    }

    setLeft(left : TreeNode<T> | null) : void {
        this.left = left;
    }
}

export class BST<T>{ 
    // root node:
    root : TreeNode<T> | null;

    // bst traversal options:
    static readonly INORDER : number = 1;
    static readonly PREORDER : number = 2;
    static readonly POSTORDER : number = 3;
    static readonly LEVELORDER : number = 4;

    constructor(val : T | null) {
        if (val) {
            this.root = new TreeNode<T>(val);
        } else {
            this.root = null;
        }
    }

    getRoot() : TreeNode<T> | null {
        return this.root;
    }

    insertNode(newNode : TreeNode<T>) : void {
        let parent : TreeNode<T> | null = null;
        let curr : TreeNode<T> | null = this.root;
        while (curr !== null) {
            if (curr.getVal() === null) {
                throw new Error("null found as value in a node.");
            } else if (curr.getVal() === newNode.getVal()!) {
                return;
            } else if (curr.getVal()! < newNode.getVal()!) {
                parent = curr;
                curr = curr.getRight();
            } else {
                parent = curr;
                curr = curr.getLeft();
            }
        }
        if (parent && parent.getVal()! < newNode.getVal()!) {
            parent.setRight(newNode);
        } else {
            parent?.setLeft(newNode);
        }
        if (parent) {
            newNode.setParent(parent);
        }
    }

    search(val : T) : TreeNode<T> | null {
        let curr : TreeNode<T> | null = this.root;
        while (curr !== null) {
            if (curr.getVal() === null) {
                throw new Error("null found as value in a node.")
            }
            else if (curr.getVal() === val) {
                return curr;
            } else if (curr.getVal()! < val) {
                curr = curr.getRight();
            } else {
                curr = curr.getLeft();
            }
        }
        return null;
    }

    deleteNode(node : TreeNode<T>) : void {
        if (node !== null) {
            if (node.getLeft() === null && node.getRight() === null) { // Case 1: node has no children
                if (node === this.root) {
                    this.root = null;
                } else if (node === node.getParent()?.getLeft()) {
                    node.getParent()?.setLeft(null);
                } else {
                    node.getParent()?.setRight(null);
                }
            } else if ((node.getLeft() !== null || node.getRight() !== null) && (node.getLeft() !== node.getRight())) {
                // Case 2: node has one child
                let child : TreeNode<T> = (node.getLeft() !== null) ? node.getLeft()! : node.getRight()!;
                let parent : TreeNode<T> | null = node.getParent();
                if (node === this.root) {
                    this.root = child;
                    child.setParent(null);
                } else if (node === parent!.getLeft()) {
                    parent!.setLeft(child);
                    child.setParent(parent);
                } else {
                    parent!.setRight(child);
                    child.setParent(parent);
                }
            } else {
                let successor : TreeNode<T> = this.successor(node)!;
                let tmpVal : T = successor.getVal()!;
                successor.setVal(node.getVal()!);
                node.setVal(tmpVal);
                this.deleteNode(val);
            }
        }
    }

    successor(node : TreeNode<T>) : TreeNode<T> | null {
        if (node.getRight() !== null) {
            return this.getMin(node.getRight()!);
        }

        let curr : TreeNode<T> = node;
        let parent : TreeNode<T> | null = node.getParent();
        while ((parent !== null) && (curr === parent.getRight())) {
            curr = parent;
            parent = parent.getParent();
        }
        return parent;
    }

    predecessor(node : TreeNode<T>) : TreeNode<T> | null {
        if (node.getLeft() !== null) {
            return this.getMin(node.getRight()!);
        }

        let curr : TreeNode<T> = node;
        let parent : TreeNode<T> | null = node.getParent();
        while ((parent !== null) && (curr === parent.getRight())) {
            curr = parent;
            parent = parent.getParent();
        }
        return parent;
    }

    *[Symbol.iterator]() : Generator<void, Generator<T | null, void, unknown>, unknown> {
        return this.inorder();
    }

    inorder() : Generator<T | null, void, unknown> {
        return this.traverse(this.root, BST.INORDER);
    }

    preorder() : Generator<T | null, void, unknown> {
        return this.traverse(this.root, BST.PREORDER);
    }

    postorder() : Generator<T | null, void, unknown> {
        return this.traverse(this.root, BST.POSTORDER);
    }
    
    levelorder() : Generator<T | null, void, unknown> {
        return this.traverse(this.root, BST.LEVELORDER);
    }

    private *traverse(node: TreeNode<T> | null, traversalType: number) : Generator<T | null, void, unknown> {
        if (node === null) {
            return;
        }
        switch (traversalType) {
            case BST.INORDER:
                yield* this.traverse(node.getLeft(), BST.INORDER);
                yield node.getVal();
                yield* this.traverse(node.getRight(), BST.INORDER);
                break;
            case BST.PREORDER:
                yield node.getVal();
                yield* this.traverse(node.getLeft(), BST.PREORDER);
                yield* this.traverse(node.getRight(), BST.PREORDER);
                break;
            case BST.POSTORDER:
                yield* this.traverse(node.getLeft(), BST.POSTORDER);
                yield* this.traverse(node.getRight(), BST.POSTORDER);
                yield node.getVal();
                break;
            case BST.LEVELORDER:
                let queue : TreeNode<T>[]= [];
                let curr : TreeNode<T> | null;
                queue.push(node);
                while (queue.length > 0) {
                    curr = queue.shift()!;

                    if (curr.getLeft() !== null) {
                        queue.push(curr.getLeft()!);
                    }

                    if (curr.getRight() !== null) {
                        queue.push(curr.getRight()!);
                    }

                    yield curr.getVal();
                };
                break;
        }
    }

    private getMin(node : TreeNode<T> | null) : TreeNode<T> | null {
        let curr : TreeNode<T> | null = node;
        while (curr?.getLeft() !== null) {
            curr = curr!.getLeft();
        }
        return curr;
    }

    private getMax(node : TreeNode<T> | null) : TreeNode<T> | null {
        let curr : TreeNode<T> | null = node;
        while (curr?.getRight() !== null) {
            curr = curr!.getRight();
        }
        return curr;
    }

    treeMin() : TreeNode<T> | null {
        return this.getMin(this.root);
    }

    treeMax() : TreeNode<T> | null {
        return this.getMax(this.root);
    }

    isEmpty() : boolean {
        return this.root === null;
    }

    private height(node : TreeNode<T> | null) : number {
        if (this.isEmpty()) {
            return 0;
        } else if (node === null) {
            return -1;
        }
        return 1 + Math.max(this.height(node.getLeft()), this.height(node.getRight()));
    }

    treeHeight() : number {
        return this.height(this.root);
    }

    private population(node : TreeNode<T> | null) {
        if (node === null) {
            return 0;
        }
        return 1 + this.population(node.getLeft()) + this.population(node.getRight());
    }

    treePopulation() {
        return this.population(this.root);
    }
}