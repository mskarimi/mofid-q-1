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

function Paginate(props: IPaginate) {
  const {onClickNext, onClickPrev, hasPrev, hasNext, disabled} = props;
  const className = classNames({
    "flex items-center mt-5": true,
    "justify-between": hasPrev,
    "justify-end": !hasPrev,
  });

  return (
    <div className={className}>
      {hasPrev ? (
        <Button
          icon={<IconRoundedLeft className="absolute left-1 w-5 h-5" />}
          disabled={disabled}
          onClick={onClickPrev}
          className="relative flex items-center pl-7"
        >
          previous
        </Button>
      ) : null}
      {hasNext ? (
        <Button
          icon={<IconRoundedRight className="absolute right-1 w-5 h-5" />}
          disabled={disabled}
          onClick={onClickNext}
          className="relative flex items-center pr-7"
        >
          next
        </Button>
      ) : null}
    </div>
  );
}

export default Paginate;
