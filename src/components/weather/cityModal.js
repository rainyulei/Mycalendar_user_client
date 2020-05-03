import React, { useState, useEffect } from 'react';
import { getAreaCountries } from '../../connect';
import { Modal,  Cascader } from 'antd';
function CityModel(props) {
    const { visible, setVisible, setCity } = props;
    const [localCity,setLocalCity] = useState('')
    const [countries, setCountries] = useState();
    // 初始化的时候获取国家地区数据
    useEffect(() => {
        async function getCountries() {
            const res = await getAreaCountries();
            const countrs = res.data
            countrs.forEach(area => {
                area.children.forEach(country => {
                  country['isLeaf'] = false;
                });
                return area;
              });
            setCountries(countrs);
          }
      if (!countries) {
        const areacountries = getCountries();
        setCountries(areacountries);
      }
    }, [countries]);
    const handleOk = e => {
      setCity(localCity)
      setVisible(false);
    };
    const handleCancel = e => {
      setVisible(false);
    };
    const onChange = value => {
        // TODO 城市验证 
      setLocalCity(value[value.length - 1]);
    };
  
    const loadData = selectedOptions => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      (async () => {
        targetOption.loading = false;
        const countryCities = await getAreaCountries(targetOption.value);
        let cities = countryCities.data.cities;
        if (countryCities.data.Country_EN === 'China') {
          const proviences = [];
          for (const key in countryCities.data.provience) {
            const children = [];
            if (countryCities.data.provience.hasOwnProperty(key)) {
              const element = countryCities.data.provience[key];
              element.importantCity.forEach(city => {
                children.push({
                  label: city.City_EN,
                  value: city.City_EN,
                });
              });
              proviences.push({
                label: element.Province_EN,
                value: element.Province_EN,
                children,
              });
            }
          }
          cities = proviences;
        } else {
          cities = cities.map(city => {
            return { value: city.City_EN, label: city.City_EN };
          });
        }
        targetOption.children = cities;
      })();
    };
    return (
      <Modal
        title='Change city'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Cascader
          style={{ width: '100%' }}
          options={countries}
          onChange={onChange}
          loadData={loadData}
          changeOnSelect
          placeholder='Please select'
        />
      </Modal>
    );
}
export default CityModel