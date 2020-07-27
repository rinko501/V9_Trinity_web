/**
 * 
 */

import React from 'react';
import { Button, ButtonGroup, UncontrolledTooltip  } from 'reactstrap';


class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    
    // Init States
    this.state = { isRotate: true, selectedId: 0 };

    // Handel Events
    this.onSelectRotateMove = this.onSelectRotateMove.bind(this);
    this.onSelectToolbarItem = this.onSelectToolbarItem.bind(this);
  }


  onSelectRotateMove(isRotate) {
    this.setState({ isRotate: isRotate });
    this.props.setRotate(isRotate);
  }


  onSelectToolbarItem(selectedId) {
    this.setState({ selectedId: selectedId });
    this.props.selectToolbarItem(selectedId);
  }


  render() {

    const mainItems = [
      {id: 'item-BgColor', label: 'BgColor', tooltip: 'change background color'},
      {id: 'item-Lightning', label: 'Lightning', tooltip: 'Lightning Parameter Editor'}, 
      {id: 'item-1DTF', label: '1DTF', tooltip: '1-Dimension Transfer Function'}, 
      {id: 'item-2DTF', label: '2DTF', tooltip: '2-Dimension Transfer Function'}, 
      {id: 'item-Isosurface', label: 'Isosurface', tooltip: 'IsoSurface Parameter'}, 
      {id: 'item-Clipp', label: 'Clipp', tooltip: 'Clipp Volume by Coordinates'}, 
      {id: 'item-Guidance', label: 'Guidance', tooltip: 'show guidance'}
    ];

    return (
      <div class="nav-maintrinity toolbar" id="newnavtrinity">
        <div>
          <ButtonGroup className="actions">
            <Button outline active={this.state.isRotate === true} onClick={this.onSelectRotateMove.bind(this, true)}>
              <i className="fa fa-refresh fa-fw" aria-hidden="true"></i> rotate
            </Button>
            <Button outline active={this.state.isRotate === false} onClick={this.onSelectRotateMove.bind(this, false)}>
              <i className="fa fa-arrows fa-fw" aria-hidden="true"></i> move
            </Button>
          </ButtonGroup>
        </div>
        <div className="main">
          <ButtonGroup vertical>
            { mainItems.map((item) => {
              return (
                  <Button id={item.id} 
                    active={this.state.selectedId === item.id} 
                    onClick={this.onSelectToolbarItem.bind(this, item.id)}>
                    {item.label}
                  </Button>
              )
            })}
          </ButtonGroup>
          { mainItems.map((item) => {
            return (
                <UncontrolledTooltip placement="right" target={item.id}>
                  {item.tooltip}
                </UncontrolledTooltip>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Toolbar;
