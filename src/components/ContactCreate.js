import React from 'react';

export default class ContactCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // initialize state
            name: '',
            phone: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value; // name속성으로 input을 구분하고, 입력한 value를 할당
        this.setState(nextState); // state에 전달
    }
    handleClick() {
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        }
        // Create contact
        this.props.onCreate(contact);
        // Initialize current state
        this.setState({
            name: '',
            phone: ''
        });
        // contact 생성 후 name input에 focus
        this.nameInput.focus();
    }
    handleKeyPress(e) {
        if(e.charCode === 13) {
            this.handleClick();
        }
    }

    render() {
        return (
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange = {this.handleChange}
                        onKeyPress = {this.handleKeyPress}
                        ref = {(ref) => {
                            this.nameInput = ref // ref를 사용하여 input에 접근
                        }}
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
                <button onClick={this.handleClick}>Create</button>
            </div>
        )
    }
}

// prop을 초기화하는 습관을 들이자.
ContactCreate.propTypes = {
    onCreate: React.PropTypes.func
}
ContactCreate.defaultProps = {
    onCreate: () => {
        console.error('onCreate is not defined');
    }
}
