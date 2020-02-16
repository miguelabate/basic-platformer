export class ViewPort {

    offset = {x:0, y:0};
    size={width:800, height:600}; //size of the viewport

    constructor(size) {
        this.size = size;
    }

    // getter
    get bounds() {
        let bounds = {};
        //useful having bounds to work with matter contains
        bounds.min ={x:this.offset.x,y:this.offset.y};
        bounds.max ={x:this.size.width+this.offset.x,y:this.size.height+this.offset.y};
        return bounds;
    }

}