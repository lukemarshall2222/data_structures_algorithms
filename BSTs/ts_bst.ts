/* BST in TypeScript */

class TreeNode<T> {
    val : T;
    parent : TreeNode<T> | null;
    right : TreeNode<T> | null;
    left : TreeNode<T> | null;


    constructor(val : T, parent : TreeNode<T> | null=null, right : TreeNode<T> | null=null, left : TreeNode<T> | null=null) {
        this.val = val;
        this.parent = parent;
        this.right = right;
        this.left = left;
    }

    getVal() : T {
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

class BST<T>{ 
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

    insertNode(val : T) : void {
        let newNode : TreeNode<T> = new TreeNode<T>(val);
        if (this.isEmpty()) {
            this.root = newNode;
        }

        let parent : TreeNode<T> | null = null;
        let curr : TreeNode<T> | null = this.root;
        while (curr !== null) {
            if (curr.getVal() === val) {
                return;
            } else if (curr.getVal() < val) {
                parent = curr;
                curr = curr.getRight();
            } else {
                parent = curr;
                curr = curr.getLeft();
            }
        }
        if (parent && parent.getVal() < val) {
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
            if (curr.getVal() === val) {
                return curr;
            } else if (curr.getVal() < val) {
                curr = curr.getRight();
            } else {
                curr = curr.getLeft();
            }
        }
        return null;
    }

    deleteNode(val : T) : void {
        let node : TreeNode<T> | null = this.search(val);
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
                let tmpVal : T = successor.getVal();
                successor.setVal(node.getVal());
                node.setVal(tmpVal);
                this.deleteNode(val);
            }
        }
    }

    successor(node : TreeNode<T>) : TreeNode<T> | null {
        if (node.getRight() !== null) {
            return this.getMin(node.getRight());
        }

        let curr : TreeNode<T> = node;
        let parent : TreeNode<T> | null = node.getParent();
        while ((parent !== null) && (curr === parent.getRight())) {
            curr = parent;
            parent = parent.getParent();
        }
        return parent;
    }

    *[Symbol.iterator]() : Generator<void, Generator<T, void, unknown>, unknown> {
        return this.inorder();
    }

    inorder() : Generator<T, void, unknown> {
        return this.traverse(this.root, BST.INORDER);
    }

    private *traverse(node: TreeNode<T> | null, traversalType: number) : Generator<T, void, unknown> {
        if (node === null) {
            return;
        }
        switch (traversalType) {
            case BST.INORDER:
                yield* this.traverse(node.getLeft(), BST.INORDER);
                yield node.getVal();
                yield* this.traverse(node.getRight(), BST.INORDER);
            case BST.PREORDER:
                yield node.getVal();
                yield* this.traverse(node.getLeft(), BST.PREORDER);
                yield* this.traverse(node.getRight(), BST.PREORDER);
            case BST.POSTORDER:
                yield* this.traverse(node.getLeft(), BST.POSTORDER);
                yield* this.traverse(node.getRight(), BST.POSTORDER);
                yield node.getVal();
            case BST.LEVELORDER:
                let queue : TreeNode<T>[]= [];
                let curr : TreeNode<T> | null;
                queue.push(node);
                while (queue.length > 0) {
                    curr = queue[0];
                    queue.shift();

                    if (curr.getLeft() !== null) {
                        queue.push(curr.getLeft()!);
                    }

                    if (curr.getRight() !== null) {
                        queue.push(curr.getRight()!);
                    }

                    yield curr.getVal();
                };
        }
    }


    isEmpty() : boolean {
        return this.root === null;
    }
}