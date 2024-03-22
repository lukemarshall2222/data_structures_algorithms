/* TypeScript list node and linked list classes */


/* ---------------------- List Node Class ---------------------------------------------------------------------------------------------- */

class ListNode<T> {
    private val: T | null;
    private prev: ListNode<T> | null;
    private next: ListNode<T> | null;

    constructor(val: T | null=null, prev: ListNode<T> | null=null, next: ListNode<T> | null=null) {
        this.val = val
        this.prev = prev
        this.next = next
    }

    public getVal() : T | null {
        return this.val;
    }

    public getPrev() : ListNode<T> | null {
        return this.prev;
    }

    public getNext() : ListNode<T> | null {
        return this.next;
    }

    public setVal(val: T) : void {
        this.val = val;
    }

    public setPrev(node: ListNode<T> | null) : void {
        this.prev = node;
    }

    public setNext(node: ListNode<T> | null) : void {
        this.next = node;
    }
}

/* ---------------------- Linked List Class ---------------------------------------------------------------------------------------------- */

class LinkedList<T> {
    private head: ListNode<T> | null;

    constructor(val: T | null=null) {
        if (val === null) {
            this.head = null;
        } else {
            this.head = new ListNode<T>(val)
        }
    }

/* ---------------------- Insert Member Functions ---------------------------------------------------------------------------------------------- */

    push(val?: T | null) : void {
        if (val === undefined) {
            val = null;
        }
        const newNode : ListNode<T> = new ListNode<T>(val);
        if (this.isEmpty()) {
            this.head = newNode;
            return;
        } 
        this.head?.setPrev(newNode);
        newNode.setNext(this.head);
        this.head = newNode;
    }

    append(val?: T | null) : void {
        if (val === undefined) {
            val = null;
        }
        const newNode = new ListNode<T>(val);
        if (this.isEmpty()) {
            this.head = newNode;
            return;
        }
        let curr : ListNode<T> | null | undefined = this.head;
        while (curr?.getNext() !== null) {
            curr = curr?.getNext();
        }
        curr.setNext(newNode);
        newNode.setPrev(curr);
    }

    insertBefore(pos: ListNode<T>, val?: T | null) : void {
        if (val === undefined) {
            val = null;
        }
        const newNode : ListNode<T> = new ListNode<T>(val);
        if (this.isEmpty()) {
            this.head = newNode;
            return;
        }
        let curr : ListNode<T> | null | undefined = this.head;
        while (curr?.getNext() !== null) {
            if (curr == pos) {
                if (curr.getPrev() !== null) {
                    curr.getPrev()?.setNext(newNode);
                }
                if (curr === this.head) {
                    this.head = curr;
                }
                curr.setPrev(newNode);
            }
            curr = curr?.getNext();
        }
    }

    insertAfter(pos: ListNode<T>, val?: T | null) : void {
        if (val === undefined) {
            val = null;
        }
        const newNode : ListNode<T> = new ListNode<T>(val);
        if (this.isEmpty()) {
            this.head = newNode;
            return;
        }
        let curr : ListNode<T> | null | undefined = this.head;
        while (curr?.getNext() !== null) {
            if (curr == pos) {
                if (curr.getNext() !== null) {
                    curr.getNext()?.setPrev(newNode);
                }
                curr.setNext(newNode);
            }
            curr = curr?.getNext();
        }
    }

    insertAtPos(pos: number, val? : T | null) {
        if (val === undefined) {
            val = null;
        }

        const newNode : ListNode<T> = new ListNode<T>(val);
        if (this.isEmpty()) {
            this.head = newNode;
            return;
        }
        
        let curr : ListNode<T> | null | undefined = this.head;
        for (let i = 0; i < pos; i++) {
            curr = curr?.getNext();
        }

        if (curr?.getPrev() !== null) {
            curr?.getPrev()?.setNext(newNode);
        }
        if (curr === this.head) {
            this.head = curr;
        }
        curr?.setPrev(newNode);
        
    }

/* ---------------------- Deletion Member Functions ---------------------------------------------------------------------------------------------- */

    

/* ---------------------- Utility Member Functions ---------------------------------------------------------------------------------------------- */

    isEmpty() : boolean {
        if (!this.head) {
            return false;
        }
        return true;
    }

    length() : number {
        let length : number = 0;
        let curr : ListNode<T> | null = this.head;
        while (curr !== null) {
            curr = curr.getNext();
            length++;
        }
        return length;
    }

    clear() : void {
        this.head = null;
    }

}