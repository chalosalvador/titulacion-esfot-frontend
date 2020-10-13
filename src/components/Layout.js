/**
 * Created by chalosalvador on 3/1/20
 */
import React from 'react';
import Navigation from './Navigation';
import { Layout, Row, Col, Button, Popover } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';

import logoEPN from '../images/Logotipo-ESFOT.png';
import logoESFOT from '../images/Logotipo-ESFOT2.png';

const Header = Layout.Header;
const Content = Layout.Content;
const Footer = Layout.Footer;

/**
 * Este componente renderiza los elementos comunes para toda la aplicación
 *
 * Header (menu), Content y Footer
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MainLayout = props => {
  console.log( 'props', props );
  return (
    <div className='app'>
      <Layout>
        <Row type='flex' justify='center' className='header-wrapper'>
          <Col span={ 20 }>

            <Header className='header'>
              <Row type='flex' justify='space-between' align='bottom'>
                <Col xs={ 24 } md={ 6 } className='logo-wrapper'>
                  <a href='https://www.epn.edu.ec/'>
                    <img className='logo' src={ logoEPN } alt='' /></a>
                </Col>

                {/*<Col md={ 14 } align='right' className='main-menu'>*/}
                {/*  <Navigation mode='horizontal' />*/}
                {/*</Col>*/}

                <Col xs={ 2 } align='right' className='responsive-menu-button'>
                  <Popover content={ <Navigation mode='vertical' /> }
                           trigger='click'
                           placement='rightTop'
                           overlayClassName='responsive-menu-wrapper'>
                    <Button type='primary'>
                      <svg viewBox='64 64 896 896'
                           focusable='false'
                           className=''
                           data-icon='menu'
                           width='1em'
                           height='1em'
                           fill='currentColor'
                           aria-hidden='true'>
                        <path d='M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z'></path>
                      </svg>
                    </Button>
                  </Popover>
                </Col>

                <Col xs={ 22 } md={ 4 } className='logos-social-header' align='right'>
                  <a href='https://esfot.epn.edu.ec/'>
                    <img className='logo' src={ logoESFOT } alt='' /></a>
                </Col>
              </Row>
            </Header>
          </Col>
        </Row>


        <Content className='content'>
          <Row justify='center'>
            <Col span={ 24 }>
              { props.children }
            </Col>
          </Row>
        </Content>

        <Footer className='footer'>
          <Row>
            <Col xs={ { span: 24 } } md={ 6 } className='logo-blanco'>

            </Col>

            <Col xs={ {
              span: 24,
              offset: 0
            } }
                 md={ {
                   span: 5,
                   offset: 3
                 } }
                 className='footer-text'>
              © Escuela de Formación de Tecnólogos
              https://esfot.epn.edu.ec/<br />
              diresfot@epn.edu.ec<br />

            </Col>

            <Col xs={ {
              span: 24,
              offset: 0
            } }
                 md={ {
                   span: 4,
                   offset: 4
                 } }
                 className='contact-links'>
              <a href='https://www.facebook.com/ESFOT-EPN-UIO-163137570522102/?ref=bookmarks'
                 target='_blank'
                 rel='noopener noreferrer'
                 style={ {
                   marginLeft: 30,
                   marginRight: 30,

                 } }>
                <FacebookOutlined className={ 'big-icon' } />
              </a>

            </Col>
          </Row>


        </Footer>
      </Layout>
    </div>
  );
};

export default MainLayout;
