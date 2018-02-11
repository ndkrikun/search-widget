import * as React from 'react';
import { ChangeEvent } from 'react';

interface SearchLineProps {
  onChange: (event: ChangeEvent<string>) => void;
}

export class SearchLine extends React.Component<SearchLineProps, {}> {
  public render(): JSX.Element {
    return (
      <div className='search-line'>
        <input
          className='search-line__input'
          onChange={this.props.onChange.bind(this)}
          onKeyDown={this.props.onChange.bind(this)}
          onKeyUp={this.props.onChange.bind(this)}
          onKeyPress={this.props.onChange.bind(this)}
          onKeyDownCapture={this.props.onChange.bind(this)}
          onKeyPressCapture={this.props.onChange.bind(this)}
          onKeyUpCapture={this.props.onChange.bind(this)}
        />
      </div>
    );
  }
}
