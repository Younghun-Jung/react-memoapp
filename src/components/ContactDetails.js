import React from 'react';

export default class ContactDetails extends React.Component {
    constructor(props) {
        super(props);

        // 수정할 경우 수정값을 할당할 속성 초기화
        this.state = {
            isEdit: false,
            name: '',
            phone: ''
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleToggle() {
        if(!this.state.isEdit) { // edit 모드에 들어가면,
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            })
        } else { // edit 모드에서 빠져나오면서 반영
            this.handleEdit();
        }
        this.setState({ // 비동기임을 명심.
            isEdit: !this.state.isEdit
        });
        //console.log(this.state.isEdit); //this.setState는 비동기이므로 isEdit이 토글되기도 전에 console.log(...) 실행되므로 최초에 false로 나옴.
    }
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    handleEdit() {
        this.props.onEdit(this.state.name, this.state.phone);
    }
    handleKeyPress(e) {
        if(e.charCode === 13) {
            this.handleToggle();
        }
    }

    render() {

        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );

        const blank = (<div>Not Selected</div>);

        const edit = (
            <div>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange = {this.handleChange}
                        onKeyPress = {this.handleKeyPress}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange = {this.handleChange}
                        onKeyPress = {this.handleKeyPress}
                    />
                </p>
            </div>
        )
        const view = this.state.isEdit ? edit : details;


        return (
            <div>
                <h2>Details</h2>
                {
                    this.props.isSelected ? view : blank /*props로 넘긴 isSelected 분기*/
                }
                <button onClick={this.handleToggle}>
                    {this.state.isEdit ? 'Ok' : 'Edit'}
                </button>
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
        console.error('onRemove is not defined');
    },
    onEdit: () => {
        console.error('onEdit is no defined');
    }
}

ContactDetails.propTypes = {
    contact: React.PropTypes.object,
    onRemove: React.PropTypes.func,
    onEdit: React.PropTypes.func
}
