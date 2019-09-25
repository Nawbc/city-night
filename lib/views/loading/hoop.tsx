/**=================================================================================================
 *			AUTHOR --- Han Wang
 *			LICENSE --- Apache-2.0
 *			LASTMODIFY --- 2019-09-13T14:32:46.915Z
 *			REPOSITORY --- https://github.com/sewerganger/silent-concept
 *=================================================================================================*/

import React, { CSSProperties, HTMLAttributes, FC } from 'react';
import classNames from 'classnames';
import { SilentCommonAttr, SizeType, ClassValue } from '../../interfaces';
import {
	accordType,
	splitJsxProps,
	handleSize
} from '../../helper';
import './style/hoop.scss';

const prefix = 's-loading-hoop';

const HoopAttrs = [
	'size',
	'style',
	'speed',
	'pigment',
	'innerStyle',
	'className'
];

interface LoadingHoopTempProps extends SilentCommonAttr, HTMLAttributes<any> {
	pigment?: string;
	speed?: string;
	innerStyle?: CSSProperties;
	className?: any;
}

export interface LoadingHoopProps extends LoadingHoopTempProps {
	className?: ClassValue;
}

interface ClassNameEx { containerCN: string; innerCN: string };
const presetClassName = function (cProps: LoadingHoopProps): ClassNameEx {
	let { size, pigment } = cProps;
	return {
		containerCN: classNames(prefix, {
			[`${prefix}-${size}`]: accordType(size, 'String', false)
		}),
		innerCN: classNames({
			[`${prefix}-inner`]: true,
			[`${prefix}-inner-${size}`]: accordType(size, 'String', false),
			[`${prefix}-${pigment}`]: accordType(pigment, 'String', false)
		})
	};
};

const presetProps = function (props: LoadingHoopProps) {
	const sProps = splitJsxProps<LoadingHoopProps>(props, HoopAttrs);
	sProps.customProps.size = handleSize(sProps.customProps.size!);
	return sProps;
};

/**=================================================================================================
 *			LASTMODIFY --- 2019-08-27T15:00:04.462Z
 *			DESCRIPTION --- hoop 环形加载效果
 *			PROPS
 *				--- size [SizeType]
 *				--- pigment [string|CSSProperties]
 *				--- speed [string]
 *  =================================================================================================*/

const Hoop: FC<LoadingHoopProps> = function (props) {
	const { nativeProps, customProps } = presetProps(props);
	const { containerCN, innerCN } = presetClassName(customProps);
	const containerStyle = {
		...accordType(customProps.size, 'Object', {}),
		...customProps.style
	};

	return (
		<div
			{...nativeProps}
			className={containerCN}
			style={containerStyle}
		>
			<div
				className={innerCN}
				style={{
					animationDuration: customProps.speed,
					...accordType(customProps.innerStyle, 'Object', {})
				}}
			/>
		</div>
	);
};

Hoop.defaultProps = {
	pigment: 'white',
	size: 'normal' as SizeType,
	speed: '1s'
};

export default React.memo(Hoop);
