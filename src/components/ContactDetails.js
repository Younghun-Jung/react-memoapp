import React from 'react';

export default class ContactDetails extends React.Component {
    render() {
        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );
        const blank = (<div>Not Selected</div>);

        return (
            <div>
                <h2>Details</h2>
                {
                    this.props.isSelected ? details : blank /*props로 넘긴 isSelected 분기*/
                }
                <button onClick={this.props.onRemove}>Remove</button>
            </div>
        );
    }
}

ContactDetails.defaultProps = {
    contact: { //선택되지 않을 경우의 name과 phone 기본값 설정
        name: '',
        phone: ''
    },
    onRemove: () => {
        console.error('onRemove is not defined')
    }
}
