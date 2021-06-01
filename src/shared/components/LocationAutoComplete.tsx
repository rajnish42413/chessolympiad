import React, { Component } from 'react';
import { AutoComplete, Col, Form, Spin, Select } from 'antd';
import Axios from 'axios';
import { ICity, IIState } from '../../schemas/ILocation';
import Loader from './loader/Loader';

interface IProps {
  selectedState?: ISelected;
  selecteCity?: ISelected;
  selectedDistrict?: ISelected;
}
interface ISelected {
  value: string;
  key: string;
  label: string;
}
interface IState {
  loading: boolean;
  cities: Array<ICity>;
  states: Array<IIState>;
  filteredCities: Array<ICity>;
  filteredStates: Array<IIState>;
}

class LocationAutoComplete extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      states: [],
      cities: [],
      filteredCities: [],
      filteredStates: [],
    };
  }

  getStates = async () => {
    const { data } = await Axios(`states`);
    this.setState({ states: data, filteredStates: data });
    if (this.props.selectedState) {
      this.getCities(this.props.selectedState.value);
    }
  };

  getCities = async (state: string) => {
    const { data } = await Axios(`states/${state}/cities`);
    this.setState({ cities: data, filteredCities: data });
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.getStates();
    this.setState({ loading: false });
  }

  handleSelectState = (value: any) => {
    if(value.value) this.getCities(value.value);
  };

  onSearchState = (keyword: string) => {
    if (!keyword) return;
    const data = this.state.states?.filter((element) =>
      element?.state_name?.toLowerCase().includes(keyword.toLowerCase())
    );
    this.setState({ filteredStates: data });
  };

  onSearchCity = (keyword: string) => {
    if (!keyword) return;
    const data = this.state.cities?.filter((element) =>
      element?.city_name?.toLowerCase().includes(keyword.toLowerCase())
    );
    this.setState({ filteredCities: data });
  };

  render() {
    return (
      this.state.loading ? <Loader /> : <>
        {this.state.filteredStates && (
          <Col span={12}>
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: 'Please input your state!' }]}
              initialValue={this.props.selectedState ? this.props.selectedState : undefined}
            >
              <Select
                labelInValue={true}
                style={{ width: '100%' }}
                showSearch={true}
                onSearch={this.onSearchState}
                notFoundContent={!this.state.filteredStates ? <Spin size="small" /> : ""}
                filterOption={false}
                onSelect={this.handleSelectState}
                placeholder="state"
              >
                {this.state.filteredStates?.map((state) => (
                  <Select.Option key={state.id} value={state.id} label={state.state_name}>
                    {state.state_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}

        {this.state.filteredCities && (
          <Col span={12}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: 'Please input your city!' }]}
              initialValue={this.props.selecteCity ? this.props.selecteCity : undefined}
            >
              <Select
                labelInValue={true}
                style={{ width: '100%' }}
                showSearch={true}
                onSearch={this.onSearchCity}
                notFoundContent={!this.state.filteredCities ? <Spin size="small" /> : ""}
                filterOption={false}
                placeholder="city"
              >
                {this.state.filteredCities?.map((city) => (
                  <Select.Option value={city.id} key={city.id} label={city.city_name}>
                    {city.city_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}

        {this.state.filteredCities && (
          <Col span={12}>
            <Form.Item
              name="district"
              label="District"
              initialValue={this.props.selectedDistrict ? this.props.selectedDistrict : undefined}
              rules={[{ required: true, message: 'Please input your district!' }]}
            >
              <Select
                labelInValue={true}
                style={{ width: '100%' }}
                showSearch={true}
                onSearch={this.onSearchCity}
                notFoundContent={!this.state.filteredCities ? <Spin size="small" /> : ""}
                filterOption={false}
                placeholder="District"
              >
                {this.state.filteredCities?.map((city) => (
                  <Select.Option value={city.id} key={city.id} label={city.city_name}>
                    {city.city_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
      </>
    );
  }
}

export default LocationAutoComplete;
