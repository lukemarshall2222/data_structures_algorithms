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


}