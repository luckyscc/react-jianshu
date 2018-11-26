import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	NavSearch,
	Addition,
	Button,
	SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList
} from './style';

class Header extends Component {

	getListArea() {
		if(this.props.focused) {
			return (
				<SearchInfo>
					<SearchInfoTitle>
						热门搜索
						<SearchInfoSwitch>
							换一批
						</SearchInfoSwitch>
					</SearchInfoTitle>
					<SearchInfoList>
						{
							this.props.list.map((item) => {
								return <SearchInfoItem key={item}>{item}</SearchInfoItem>
							})
						}

					</SearchInfoList>
				</SearchInfo>
			)
		}else {
			return null;
		}
	}

	render() {
		return (
			<HeaderWrapper>
				<Logo href='/' />
				<Nav>
					<NavItem className="left active">首页</NavItem>
					<NavItem className="left">下载App</NavItem>
					<NavItem className="right">登录</NavItem>
					<NavItem className="right">
						<i className="iconfont">&#xe636;</i>
					</NavItem>
					<SearchWrapper>
						<CSSTransition
							timeout={200}
							in={this.props.focused}
							classNames="slide"
						>
							<NavSearch
								className={this.props.focused ? 'focused': ''}
								onFocus={this.props.handleInputFocus}
								onBlur={this.props.handleInputBlur}
							>
							</NavSearch>
						</CSSTransition>
						<i className={this.props.focused ? 'focused iconfont': 'iconfont'}>&#xe617;</i>
						{ this.getListArea() }
					</SearchWrapper>
				</Nav>
				<Addition>
					<Button className="writting">
						<i className="iconfont">&#xe615;</i>
						写文章
					</Button>
					<Button className="reg">注册</Button>
				</Addition>
			</HeaderWrapper>
		)
	}
}

const mapStateToProps = (state) => {
	return {
        focused: state.getIn(['header', 'focused']),
		list: state.getIn(['header', 'list'])
	}
}

const mapDispatchProps = (dispatch) => {
	return {
		handleInputFocus() {
			dispatch(actionCreators.getList());
			dispatch(actionCreators.searchFocus());
		},
		handleInputBlur() {
			dispatch(actionCreators.searchBlur());
		}
	}
}

export default connect(mapStateToProps, mapDispatchProps)(Header);
