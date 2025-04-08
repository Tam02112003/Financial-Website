"use client";
import React from "react";
import styled from "styled-components";

const StatisticsCard = ({
  title,
  amount,
  color,
  iconSrc,
  isBalanceCard = false,
}) => {
  if (isBalanceCard) {
    return (
      <BalanceCardContent>
        <CardInfoColumn>
          <CardContent>
            <CardTitle>{title}</CardTitle>
            <CardAmount color={color}>{amount}</CardAmount>
          </CardContent>
        </CardInfoColumn>
        <CardIconColumn>
          <CardIcon src={iconSrc} alt={`${title} icon`} />
        </CardIconColumn>
      </BalanceCardContent>
    );
  }

  return (
    <CardColumn>
      <CardContainer>
        <CardInfoColumn>
          <CardContent>
            <CardTitle>{title}</CardTitle>
            <CardAmount color={color}>{amount}</CardAmount>
          </CardContent>
        </CardInfoColumn>
        <CardIconColumn>
          <CardIcon src={iconSrc} alt={`${title} icon`} />
        </CardIconColumn>
      </CardContainer>
    </CardColumn>
  );
};

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 50%;
  margin-left: ${(props) => (props.index === 0 ? "0px" : "20px")};

  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0;
  }
`;

CardColumn.defaultProps = {
  index: 0,
};

const CardContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-color: rgba(209, 213, 219, 1);
  border-style: solid;
  border-width: 1px;
  flex-grow: 1;
  padding: 15px 20px;
  overflow: hidden;
  display: flex;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const BalanceCardContent = styled.div`
  display: flex;
  width: 100%;
`;

const CardInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 70%;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: stretch;
  font-family:
    Inter,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 28px;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const CardTitle = styled.h3`
  color: rgba(0, 0, 0, 1);
  font-weight: 400;
  align-self: start;
  margin: 0;
`;

const CardAmount = styled.p`
  color: ${(props) => props.color || "rgba(0, 0, 0, 1)"};
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 0;
`;

const CardIconColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 30%;
  margin-left: 20px;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const CardIcon = styled.img`
  aspect-ratio: 1.11;
  object-fit: contain;
  object-position: center;
  width: 62px;
  margin-top: 6px;
  flex-shrink: 0;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

export default StatisticsCard;
