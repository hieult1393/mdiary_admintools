import React from 'react';

export class UpdateButton extends React.Component {
  render() {
    return (
      <button className='btn btn-circle btn-icon-only green-jungle' type='button'
              onClick={this.props.onClick}>
        <i className='mi mi-pencil'/>
      </button>
    );
  }
}

export class DetailButton extends React.Component {
  render() {
    return (
      <button className='btn btn-circle btn-icon-only yellow-mint'
              type='button' onClick={this.props.onClick}>
        <i className='fa fa-search'/>
      </button>
    );
  }
}

export class DeleteButton extends React.Component {
  render() {
    return (
      <button className='btn btn-circle btn-icon-only red'
              type='button' onClick={this.props.onClick}>
        <i className='mi mi-trash'/>
      </button>
    );
  }
}

export class SaveButton extends React.Component {
  render() {
    return (
      <button className="btn btn-circle btn-icon-only green" type="button"
              onClick={this.props.onClick}>
        <i className='fa fa-check'/>
      </button>
    );
  }
}

export class CancelButton extends React.Component {
  render() {
    return (
      <button className="btn btn-circle btn-icon-only yellow-crusta" type="button"
              onClick={this.props.onClick}>
        <i className='fa fa-ban'/>
      </button>
    );
  }
}

export class TableColumn extends React.Component {
  render() {
    const { value } = this.props;
    return (
      <td>{value}</td>
    );
  }
}

export class TableRow extends React.Component {
  render() {
    return (
      <tr>{this.props.children}</tr>
    );
  }
}

export default class Table extends React.Component {
  render() {
    const { tableHeaderList } = this.props;
    return (
      <div className='portlet-body'>
        <div className='table-responsive'>
          <table className='table table-striped table-hover table-bordered'>
            <thead>
            <tr>
              {tableHeaderList.map(item => <th key={item}>{item}</th>)}
            </tr>
            </thead>
            <tbody>
            {this.props.children}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
