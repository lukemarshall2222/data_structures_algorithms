/* Red-Black Tree in TypeScript */

import { TreeNode, BST } from "../BSTs/ts_bst";


export class RBTnode extends TreeNode<number> {

    static readonly BLACK : number = 0;
    static readonly RED : number = 1;

    private color : number;

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
        let gParent : RBTnode = parent.getParent()! as RBTnode;
        let uncle : RBTnode;

        while (parent.getColor() === RBTnode.RED) {
            parent = curr.getParent()! as RBTnode;
            gParent = parent.getParent()! as RBTnode;
            if (parent === gParent.getLeft()) {
                uncle = gParent.getRight()! as RBTnode;

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
        (<RBTnode>this.root).setColor(RBTnode.BLACK);
    }


    private transplant(u : RBTnode, v : RBTnode) : void {
        if (u.getParent() === this.sentinel) {
            this.root = v;
        } else if (u === u.getParent()!.getLeft()) {
            u.getParent()!.setLeft(v);
        } else {
            u.getParent()!.setRight(v);
        }
        v.setParent(u.getParent());
    }

    deleteNode(z: RBTnode): void {
        let y : RBTnode = z;
        let yOriginalColor : number = y.getColor();
        let x : RBTnode;
        if (z.getLeft() as RBTnode === this.sentinel) {
            x = z.getRight() as RBTnode;
            this.transplant(z, z.getRight()! as RBTnode);
        } else if (z.getRight() as RBTnode === this.sentinel) {
            x = z.getLeft()! as RBTnode;
            this.transplant(z, z.getLeft() as RBTnode);
        } else {
            y = this.getMin(z.getRight()) as RBTnode;
            yOriginalColor = y.getColor();
            x = y.getRight()! as RBTnode;
            if (y !== z.getRight() as RBTnode) {
                this.transplant(y, y.getRight()! as RBTnode);
                y.setRight(z.getRight());
                y.getRight()!.setParent(y);
            } else {
                x.setParent(y);
            }
            this.transplant(z, y);
            y.setLeft(z.getLeft());
            y.getLeft()!.setParent(y);
            y.setColor(z.getColor());
        }
        if (yOriginalColor === RBTnode.BLACK) {
            this.deleteFixup(x);
        }
   }

    private deleteFixup(x : RBTnode) {
        let w : RBTnode = this.sentinel;
        while ((x !== this.root) && (x.getColor() === RBTnode.BLACK)) {
            if (x === x.getParent()!.getLeft() as RBTnode) {
                w = x.getParent()!.getRight() as RBTnode;
                if (w.getColor() === RBTnode.RED) {
                    w.setColor(RBTnode.BLACK);
                    (<RBTnode>w.getParent()).setColor(RBTnode.RED);
                    this.leftRotate(x.getParent()! as RBTnode);
                    w = x.getParent()!.getRight() as RBTnode;
                }
                if (((<RBTnode>w.getLeft()).getColor() === RBTnode.BLACK) && 
                    ((<RBTnode>w.getRight()).getColor() === RBTnode.BLACK)) {
                        w.setColor(RBTnode.RED);
                        x = x.getParent() as RBTnode;
                } else {
                        if ((<RBTnode>w.getRight()).getColor() === RBTnode.BLACK) {
                            (<RBTnode>w.getLeft()).setColor(RBTnode.BLACK);
                            w.setColor(RBTnode.RED);
                            this.rightRotate(w);
                            w = x.getParent()!.getRight() as RBTnode;
                        }
                        w.setColor((<RBTnode>x.getParent()).getColor());
                        (<RBTnode>x.getParent()).setColor(RBTnode.BLACK);
                        (<RBTnode>w.getRight()).setColor(RBTnode.BLACK);
                        this.leftRotate(x.getParent() as RBTnode);
                        x = this.root! as RBTnode;
                }
            } else {
                w = x.getParent()!.getLeft() as RBTnode;
                if (w.getColor() === RBTnode.RED) {
                    w.setColor(RBTnode.BLACK);
                    (<RBTnode>w.getParent()).setColor(RBTnode.RED);
                    this.rightRotate(x.getParent()! as RBTnode);
                    w = x.getParent()!.getLeft() as RBTnode;
                }
                if (((<RBTnode>w.getRight()).getColor() === RBTnode.BLACK) && 
                    ((<RBTnode>w.getLeft()).getColor() === RBTnode.BLACK)) {
                        w.setColor(RBTnode.RED);
                        x = x.getParent() as RBTnode;
                } else {
                    if ((<RBTnode>w.getRight()).getColor() === RBTnode.BLACK) {
                        (<RBTnode>w.getLeft()).setColor(RBTnode.BLACK);
                        w.setColor(RBTnode.RED);
                        this.leftRotate(w);
                        w = x.getParent()!.getLeft() as RBTnode;
                    }
                    w.setColor((<RBTnode>x.getParent()).getColor());
                    (<RBTnode>x.getParent()).setColor(RBTnode.BLACK);
                    (<RBTnode>w.getLeft()).setColor(RBTnode.BLACK);
                    this.rightRotate(x.getParent() as RBTnode);
                    x = this.root! as RBTnode;
                }
            }
        }
        x.setColor(RBTnode.BLACK);
    }
    
}