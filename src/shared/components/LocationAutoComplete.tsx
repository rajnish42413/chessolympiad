import React, { Component } from 'react';
import { AutoComplete, Col, Form, Spin } from 'antd';
import Axios from 'axios';
import { ICity, ICState } from '../../schemas/ICountry';

interface IProps {
  state?: string;
  city?: string;
}
interface IState {
  loading: boolean;
  cities: Array<ICity>;
  states: Array<ICState>;
  filteredCities: Array<ICity>;
  filteredStates: Array<ICState>;
  state: string | null;
  city: string | null;
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
      state: this.props?.state ? this.props.state : null,
      city: this.props?.city ? this.props.city : null,
    };
  }

  getStates = async () => {
    this.setState({ loading: true });
    const { data } = await Axios(`countries/${101}/states`);
    this.setState({ states: data, filteredStates: data, loading: false });
    if (this.state.state && this.state.city) this.getCities(this.state.state);
  };

  getCities = async (city: string) => {
    this.setState({ loading: true });
    const { data } = await Axios(`states/${city}/cities`);
    this.setState({ cities: data, filteredCities: data, loading: false });
  };

  componentDidMount() {
    this.getStates();
  }

  handleSelectState = (value: any) => {
    this.getCities(value);
  };

  onSearchState = (keyword: string) => {
    if (!keyword) return;
    const data = this.state.states?.filter((element) =>
      element?.name?.toLowerCase().includes(keyword.toLowerCase())
    );
    this.setState({ filteredStates: data });
  };

  onSearchCity = (keyword: string) => {
    if (!keyword) return;
    const data = this.state.cities?.filter((element) =>
      element?.name?.toLowerCase().includes(keyword.toLowerCase())
    );
    this.setState({ filteredCities: data });
  };

  render() {
    return (
      <>
        {this.state.filteredStates && (
          <Col span={12}>
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: 'Please input your state!' }]}
              initialValue={this.state.state ? this.state.state : null}
            >
              <AutoComplete
                style={{ width: '100%' }}
                showSearch={true}
                onSearch={this.onSearchState}
                notFoundContent={!this.state.filteredStates ? <Spin size="small" /> : null}
                filterOption={false}
                onSelect={this.handleSelectState}
                placeholder="state"
              >
                {this.state.filteredStates?.map((state) => (
                  <AutoComplete.Option value={state.name} key={state.id}>
                    {state.name}
                  </AutoComplete.Option>
                ))}
              </AutoComplete>
            </Form.Item>
          </Col>
        )}

        {this.state.filteredCities && (
          <Col span={12}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: 'Please input your city!' }]}
              initialValue={this.state.city ? this.state.city : null}
            >
              <AutoComplete
                style={{ width: '100%' }}
                showSearch={true}
                onSearch={this.onSearchCity}
                notFoundContent={!this.state.filteredCities ? <Spin size="small" /> : null}
                filterOption={false}
                placeholder="city"
              >
                {this.state.filteredCities?.map((city) => (
                  <AutoComplete.Option value={city.name} key={city.id}>
                    {city.name}
                  </AutoComplete.Option>
                ))}
              </AutoComplete>
            </Form.Item>
          </Col>
        )}

        {this.state.filteredCities && (
          <Col span={12}>
            <Form.Item
              name="district"
              label="District"
              rules={[{ required: true, message: 'Please input your district!' }]}
            >
              <AutoComplete
                style={{ width: '100%' }}
                showSearch={true}
                onSearch={this.onSearchCity}
                notFoundContent={!this.state.filteredCities ? <Spin size="small" /> : null}
                filterOption={false}
                placeholder="District"
              >
                {this.state.filteredCities?.map((city) => (
                  <AutoComplete.Option value={city.name} key={city.id}>
                    {city.name}
                  </AutoComplete.Option>
                ))}
              </AutoComplete>
            </Form.Item>
          </Col>
        )}
      </>
    );
  }
}

export default LocationAutoComplete;
