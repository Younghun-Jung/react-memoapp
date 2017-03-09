import React from 'react';

 export default class ContactInfo extends React.Component {
     render() {
         return (
             <div onClick={this.props.onClick}> {/*props로 받은 onClick 적용*/ }
                {this.props.contact.name}
             </div>
         );
     }
 }
