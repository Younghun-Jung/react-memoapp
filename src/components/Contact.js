import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [
                {
                    name: "Abet",
                    phone: '111-000-0001'
                },{
                    name: "Betty",
                    phone: '222-000-0002'
                },{
                    name: "Chalie",
                    phone: '333-000-0003'
                },{
                    name: "Denis",
                    phone: '444-000-0004'
                },{
                    name: "Elly",
                    phone: '555-000-0005'
                }
            ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }
    handleClick(key) {
        this.setState({
            selectedKey: key
        });
        console.log(key, 'is selected');
    }

    render() {
        const mapToComponent = (data) => {
            data.sort((a, b) => {
                return a.name > b.name;
            });
            // 검색 필터
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
                }
            )
            return data.map((contact, i) => {
                return (
                    <ContactInfo
                        contact={contact}
                        key={i}
                        onClick={()=>this.handleClick(i)} // 컴포넌트에는 적용안되며 해당 컴포넌트의 props로 넘겨서 사용.
                    />
                );
            });
        }

        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search..."
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponent(this.state.contactData)}</div>
                <ContactDetails
                    isSelected={this.state.selectedKey != -1}
                />
            </div>
        );
    }
}
