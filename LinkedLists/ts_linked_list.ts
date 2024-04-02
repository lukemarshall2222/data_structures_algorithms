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

    push(val: T | null) : void {
        const newNode : ListNode<T> = new ListNode<T>(val);
        if (this.isEmpty()) {
            this.head = newNode;
            return;
        } 
        this.head?.setPrev(newNode);
        newNode.setNext(this.head);
        this.head = newNode;
    }

    append(val: T | null) : void {
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

    insertBefore(pos: ListNode<T>, val: T | null) : void {
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

    insertAfter(pos: ListNode<T>, val: T | null) : void {
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

    insertAtPos(pos: number, val : T | null) {
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

    pop() : T | null {
        if (this.isEmpty()) {
            return null;
        }
        if (this.head) {
            const tmp : T | null = this.head?.getVal()
            this.head = this.head?.getNext();
            if (this.head) {
                this.head.setPrev(null);
            }
            return tmp;
        } 
        return null;
    } 
    
    deqeue() : T | null {
        if (this.isEmpty()) {
            return null;
        }
        let curr : ListNode<T> | null | undefined = this.head;
        while (curr?.getNext() !== null) {
            curr = curr?.getNext();
        } 
        const val : T | null = curr.getVal();
        if (curr.getPrev() !== null) {
            curr.getPrev()?.setNext(null);
        }
        return val;
    }

    deleteNode(node : ListNode<T> | null) : T | null {
        if (node === null) {
            return null;
        }
        let curr : ListNode<T> | null | undefined = this.head;
        while (curr !== null) {
            if (curr === node) {
                if (curr === this.head) {
                    this.head = curr.getNext();
                } else {
                    curr.getPrev()?.setNext(curr.getNext());
                }
                if (curr.getNext() !== null) {
                    curr.getNext()?.setPrev(curr.getPrev());
                }
                return curr.getVal();
            }
        }
        return null; 
    }

    deleteVal(val : T) : T | null {
        let curr : ListNode<T> | null | undefined = this.head;
        while (curr !== null) {
            if (curr.getVal() === val) {
                if (curr === this.head) {
                    this.head = curr.getNext();
                } else {
                    curr.getPrev()?.setNext(curr.getNext());
                }
                if (curr.getNext() !== null) {
                    curr.getNext()?.setPrev(curr.getPrev());
                }
                return curr.getVal();
            }
        }
        return null; 
    }

    removeBefore(node : ListNode<T> | null) : T | null {
        if (node === null) {
             return null;
        }
        if (this.isEmpty()) {
            return null;
        }
        let curr : ListNode<T> | null | undefined = this.head;
        while (curr !== null) {
            if (curr === node) {
                if (curr.getPrev() !== null) {
                    const tmp : T | null = curr.getPrev()?.getVal() ?? null;
                    if (curr.getPrev()?.getPrev() !== null) {
                        curr.getPrev()?.getPrev()?.setNext(curr);
                        curr.setPrev(curr.getPrev()?.getPrev() ?? null);
                    } else {
                        this.head = curr;
                        this.head.setPrev(null);
                    }
                    return tmp;
                }
            } else {
                curr = curr?.getNext();
            }
        }
        return null;
    }

    removeAfter(node : ListNode<T> | null) : T | null {
        if (node === null) {
            return null;
        }
        if (this.isEmpty()) {
            return null;
        }
        let curr : ListNode<T> | null | undefined = this.head;
        while (curr !== null ) {
            if (curr === node) {
                if (curr.getNext() !== null) {
                    const tmp : T | null = curr.getNext()?.getVal() ?? null;
                    if (curr.getNext()?.getNext()) {
                        curr.setNext(curr.getNext()?.getNext() ?? null);
                        curr.getNext()?.getNext()?.setPrev(curr);
                    } else {
                        curr.setNext(null);
                    }
                    return tmp;
                } 
            } else {
                curr = curr?.getNext();
            }
        }
        return null;
    }

    removeAtPos(pos : number) : T | null {
        if (pos > this.length()) {
            return null;
        }
        let curr : ListNode<T> | null | undefined = this.head;
        for (let i = 0; i < pos; i++) {
            if (curr?.getNext() == null) {
                return null;
            }
            curr = curr?.getNext();
        }
        return this.deleteNode(curr ?? null);
    }

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

    printList() : void {
        if (this.isEmpty()) {
            console.log("The linked list is empty.");
        }
        let curr : ListNode<T> | null = this.head;
        while (curr !== null) {
            console.log(curr.getVal());
        }
    }

    clear() : void {
        this.head = null;
    }

}