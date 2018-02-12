import * as React from 'react';
import { ChangeEvent } from 'react';

interface SearchLineProps {
  suggest: string;
  search: string;
  onChange: (event: ChangeEvent<string>) => void;
}

interface SuggestParts {
  hidden: string;
  visible: string;
}

export class SearchLine extends React.Component<SearchLineProps, {}> {
  private readonly note = 'Start to typing name or surname (George, Rachel, Charles, etc)';

  private get suggest(): SuggestParts {
    const { suggest, search } = this.props;
    const hidden = suggest.slice(0, search.length);
    const visible = suggest.slice(search.length, suggest.length);

    return { hidden, visible }
  }

  private get filled(): string {
    return this.props.search.length > 0
      ? 'is-filled'
      : '';
  }

  public render(): JSX.Element {
    return (
      <div className='search-line'><label>
        <span className='search-line__suggest'>
          <span className='search-line__suggest-hidden'>{this.suggest.hidden}</span>
          {this.suggest.visible}
        </span>
        <input
          className={`search-line__input ${this.filled}`}
          value={this.props.search}
          onChange={this.props.onChange.bind(this)}
          onKeyDown={this.props.onChange.bind(this)}
          onKeyUp={this.props.onChange.bind(this)}
          onKeyPress={this.props.onChange.bind(this)}
          onKeyDownCapture={this.props.onChange.bind(this)}
          onKeyPressCapture={this.props.onChange.bind(this)}
          onKeyUpCapture={this.props.onChange.bind(this)}
        />
        <span className='search-line__note'>{this.note}</span>
      </label></div>
    );
  }
}
