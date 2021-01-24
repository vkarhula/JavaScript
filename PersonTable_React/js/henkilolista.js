class PersonCategoryRow extends React.Component {
  render() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
}

class PersonRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.person.lastname}</td>
        <td>{this.props.person.firstname}</td>
      </tr>
    );
  }
}

class PersonTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.persons.forEach((person) => {
      if (person.lastname.indexOf(this.props.filterText) === -1) { /*|| (!product.stocked && this.props.inStockOnly)) {*/
        return;
      }
      if (person.category !== lastCategory) {
        rows.push(<PersonCategoryRow category={person.category} key={person.category} />);
      }
      rows.push(<PersonRow person={person} key={person.lastname} />);
      lastCategory = person.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Lastname</th>
            <th>Firstname</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }
  
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

class FilterablePersonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };
    
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <PersonTable
          persons={this.props.persons}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

var PEOPLE = [
    {category: 'Teacher', lastname: 'Juntunen', firstname: 'Jouni'},
    {category: 'Teacher', lastname: 'Ojala', firstname: 'Pekka'},
    {category: 'Teacher', lastname: 'Ojala', firstname: 'Pasi'},
    {category: 'Teacher', lastname: 'Oja', firstname: 'Päivi'},
    {category: 'Teacher', lastname: 'Räisänen', firstname: 'Teppo'},
    {category: 'Student', lastname: 'Opiskelija', firstname: 'Virpi'}
];

ReactDOM.render(
  <FilterablePersonTable persons={PEOPLE} />,
  document.getElementById('container')
);