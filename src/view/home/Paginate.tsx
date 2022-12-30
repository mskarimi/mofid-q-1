import React, {MouseEventHandler} from "react";
import {Button} from "antd";
import classNames from "classnames";
import IconRoundedRight from "assets/icons/IconRoundedRight";
import IconRoundedLeft from "assets/icons/IconRoundedLeft";

interface IPaginate {
  hasNext: boolean;
  hasPrev: boolean;
  onClickNext: MouseEventHandler;
  onClickPrev: MouseEventHandler;
  disabled: boolean;
}

const btnClassName =
  "group flex items-center text-textColor hover:text-[#4096ff] disabled:text-[#374151] disabled:border-[#374151]";
const iconClassName =
  "w-5 h-5 text-textColor group-hover:text-[#4096ff] transition-colors ease-linear group-disabled:text-[#374151] duration-200";

function Paginate(props: IPaginate) {
  const {onClickNext, onClickPrev, hasPrev, hasNext, disabled} = props;
  const className = classNames({
    "flex items-center mt-5": true,
    "justify-between": hasNext,
    "justify-end": !hasNext,
  });

  return (
    <div className={className}>
      {hasNext ? (
        <Button disabled={disabled} onClick={onClickNext} className={btnClassName}>
          <IconRoundedLeft className={`mr-2 ${iconClassName}`} />
          بعدی
        </Button>
      ) : null}
      {hasPrev ? (
        <Button disabled={disabled} onClick={onClickPrev} className={btnClassName}>
          قبلی
          <IconRoundedRight className={`ml-2 ${iconClassName}`} />
        </Button>
      ) : null}
    </div>
  );
}

export default Paginate;
