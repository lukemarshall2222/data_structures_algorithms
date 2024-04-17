/* Red-Black Tree in TypeScript */

import { TreeNode, BST } from "../BSTs/ts_bst";


export class RBTnode extends TreeNode<number> {

    static readonly BLACK : number = 0;
    static readonly RED : number = 1;

    color : number;

    constructor(val : number, parent : RBTnode | null=null, right : RBTnode | null=null, left : RBTnode| null=null) {
        super(val, parent, left, right);
        this.color = RBTnode.BLACK;
    }

    getColor() : number {
        return this.color;
    }

    setColor(color: number) : void {
        this.color = color;
    }
}

export class RBT extends BST<number> {

    sentinel : RBTnode;

    constructor(val : number | null) {
        super(val);
        this.sentinel = new RBTnode(-1);
        if (val !== null) {
            this.root = new RBTnode(val);
        } else {
            this.root = this.sentinel;
        }
    }

    private leftRotate(curr : RBTnode) : void {
        let rChild : RBTnode = curr.getRight()! as RBTnode;
        let glChild : RBTnode = rChild.getLeft()! as RBTnode;
        let parent : RBTnode = curr.getParent() as RBTnode;

        curr.setRight(glChild);
        if (glChild !== this.sentinel) {
            glChild.setParent(curr);
        }

        rChild.setParent(parent);
        if (parent === this.sentinel) {
            this.root = rChild;
        } else if (curr === parent.getLeft()) {
            parent.setLeft(rChild);
        } else {
            parent.setRight(rChild);
        }

        rChild.setLeft(curr);
        curr.setParent(rChild);
    }

    private rightRotate(curr : RBTnode): void {
        let lChild : RBTnode = curr.getLeft()! as RBTnode;
        let grChild : RBTnode = lChild.getRight() as RBTnode;
        let parent : RBTnode = curr.getParent() as RBTnode;

        curr.setLeft(grChild);
        if (grChild !== this.sentinel) {
            grChild.setParent(curr);
        }

        lChild.setParent(parent);
        if (parent === this.sentinel) {
            this.root = lChild;
        } else if (curr === parent.getRight()) {
            parent.setRight(lChild);
        } else {
            parent.setLeft(lChild);
        }

        lChild.setRight(curr);
        curr.setParent(lChild);
    }

    insertNode(newNode : RBTnode) : void {
        super.insertNode(newNode);
        newNode.setLeft(this.sentinel);
        newNode.setRight(this.sentinel);
        newNode.setColor(RBTnode.RED);
        if (newNode.getParent() === null) {
            newNode.setParent(this.sentinel);
        }
        this.insertFixup(newNode);
    }

    private insertFixup(node: RBTnode) : void {
        let curr : RBTnode = node;
        let parent : RBTnode = curr.getParent()! as RBTnode;
        let gParent : RBTnode = curr.getParent()! as RBTnode;
        let uncle : RBTnode;

        while (parent.getColor() === RBTnode.RED) {
            parent = curr.getParent()! as RBTnode;
            gParent = parent.getParent()! as RBTnode;
            if (parent === gParent.getLeft()) {
                uncle = gParent.getRight()! as RBTnode;

                // Case 1:
                if (uncle.getColor() === RBTnode.RED) {
                    parent.setColor(RBTnode.BLACK);
                    uncle.setColor(RBTnode.BLACK);
                    gParent.setColor(RBTnode.RED);
                    curr = gParent;
                } else {
                    if (curr === parent.getRight()) {
                        curr = parent;
                        this.leftRotate(curr);
                        parent = curr.getParent()! as RBTnode;
                        gParent = parent.getParent()! as RBTnode;
                    }
                    parent.setColor(RBTnode.BLACK);
                    gParent.setColor(RBTnode.RED);
                    this.rightRotate(gParent);
                }
            } else {
                uncle = gParent.getLeft()! as RBTnode;

                // Case 2:
                if (uncle.getColor() === RBTnode.RED) {
                    parent.setColor(RBTnode.BLACK);
                    uncle.setColor(RBTnode.BLACK);
                    gParent.setColor(RBTnode.RED);
                    curr = gParent;
                } else {
                    if (curr === parent.getLeft()) {
                        curr = parent;
                        this.rightRotate(curr);
                        parent = curr.getParent()! as RBTnode;
                        gParent = parent.getParent()! as RBTnode;
                    }
                    parent.setColor(RBTnode.BLACK);
                    gParent.setColor(RBTnode.RED);
                    this.leftRotate(gParent);
                }
            }
        }
        let root : RBTnode = this.root! as RBTnode;
        root.setColor(RBTnode.BLACK);
    }

   deleteNode(node: RBTnode): void {
       
   }
    
}