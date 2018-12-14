import React from 'react';
import ReactSwipe from 'react-swipe';
export default class HomeSlider extends React.Component{
    render(){
        return (<div>
            <ReactSwipe className="carousel" swipeOptions={{continuous: true,auto:3000}}>
                {this.props.lists.map((item,index)=>(
                    <div>
                        <a herf={item.url}>
                        <img src={item.photoUrl} src={item.photoUrl}/>
                        </a>
                    </div>
                ))}
            </ReactSwipe>
        </div>)
    }
}