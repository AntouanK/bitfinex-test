//
//
const channelInfoMap = new Map();

//
//
const messageHandler = cb => msg => {
  try {
    const msgObject = JSON.parse(msg.data);
    let { chanId, channel, pair, symbol } = msgObject;
    let channelInfo;

    if (chanId !== undefined) {
      channelInfoMap.set(chanId, { channel, pair, symbol });
      console.log("chanId", chanId, "is channel", channel);
      console.log(msg);
    } else {
      if (Array.isArray(msgObject)) {
        chanId = msgObject[0];
        let payload = msgObject.slice(1);
        if (payload[0] === "hb") {
          //it's just a heartbeat
          return;
        }
        channelInfo = channelInfoMap.get(chanId);

        if (typeof cb === "function") {
          cb(channelParser({ channelInfo, payload }));
        }
      }
    }
  } catch (parseErr) {
    console.error(parseErr);
  }
};

//
//
const channelParser = ({ channelInfo, payload }) => {
  if (!Array.isArray(payload)) {
    return { channelInfo, payload };
  }

  let newPayload = payload;
  if (channelInfo.channel === "trades") {
    let code, row;
    if (payload.length === 1) {
      row = payload[0];
    } else {
      code = payload[0];
      row = payload[1];
    }

    newPayload = {
      code,
      trade: {
        ID: row[0],
        MTS: row[1],
        AMOUNT: row[2],
        PRICE: row[3],
        PERIOD: row[4]
      }
    };
  } else if (channelInfo.channel === "ticker") {
    let row = payload.pop();
    newPayload = {
      BID: row[0],
      BID_SIZE: row[1],
      ASK: row[2],
      ASK_SIZE: row[3],
      DAILY_CHANGE: row[4],
      DAILY_CHANGE_PERC: row[5],
      LAST_PRICE: row[6],
      VOLUME: row[7],
      HIGH: row[8],
      LOW: row[9]
    };
  } else {
    throw new Error("unknown channel");
  }

  return { channelInfo, payload: newPayload };
};

//
//
const initiate = cb => {
  const wss = new WebSocket("wss://api.bitfinex.com/ws/2");

  wss.onmessage = messageHandler(cb);

  wss.onopen = () => {
    let msgSubTicker = JSON.stringify({
      event: "subscribe",
      channel: "ticker",
      symbol: "tBTCUSD"
    });
    wss.send(msgSubTicker);

    let msgSubTrades = JSON.stringify({
      event: "subscribe",
      channel: "trades",
      symbol: "tBTCUSD"
    });
    wss.send(msgSubTrades);
  };
  //----------------------------------------------------
};

//
//
export { initiate };
