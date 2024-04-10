/* Red-Black Tree in TypeScript */

import { TreeNode, BST } from "../BSTs/ts_bst";


export class RBTnode<T> extends TreeNode<T> {

    static readonly BLACK : number = 0;
    static readonly RED : number = 1;

    color : number;

    constructor(val : T, parent : RBTnode<T> | null=null, right : RBTnode<T> | null=null, left : RBTnode<T> | null=null) {
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

export class RBT<T> extends BST<T> {

    constructor(val : T | null) {
        super(val);
        if (val !== null) {
            this.root = new RBTnode(val);
        } else {
            this.root = null;
        }
    }

    
}