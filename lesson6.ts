// deno-lint-ignore-file no-explicit-any
async function confirmAqc(data: any[]): Promise<string> {
  if (data[1] === 0) {
    return String(data[0]);
  } else {
    return "品質情報を確認して下さい";
  }
}

async function findIndex(data: any[], code: string): Promise<number> {
  const index = data.findIndex((i) => i.area.code === code);
  return index;
}

export async function lesson6() {
  const latestTimeUrl =
    "https://www.jma.go.jp/bosai/amedas/data/latest_time.txt";
  const latestTimeRes = await fetch(latestTimeUrl);
  const latestTimeText = await latestTimeRes.text();
  const latestDatetime = new Date(latestTimeText);
  const yyyymmdd = latestDatetime.toISOString().split("T")[0].replace(/-/g, "");
  const h3 = `0${Math.floor(latestDatetime.getHours() / 3) * 3}`.slice(-2);
  const area = "130000";
  const detailArea = "130010";
  const stnid = "44132";

  const overviewForecastUrl = `https://www.jma.go.jp/bosai/foercast/data/overview_forecast/${area}.json`;
  const overviewForecastRes = await fetch(overviewForecastUrl);
  const overviewForecastData = await overviewForecastRes.json();
  const overviewForecastText = overviewForecastData.text.split("\n").join(" ");

  const forecastUrl = `https://www.jma.go.jp/bosai/forecast/data/forecast/${area}.json`;
  const forecastRes = await fetch(forecastUrl);
  const forecastData = await forecastRes.json();
  const forecastDataAreas = forecastData[0].timeSeries[0].areas;
  const forecastDataTargetIndex = await findIndex(
    forecastDataAreas,
    detailArea
  );
  const weathers = forecastDataAreas[forecastDataTargetIndex].weathers;
  const tomorrowWeather = weathers[1].split(" ").join(" ");

  const amedasUrl = `https://www.jma.go.jp/bosai/amedas/data/point/${stnid}/${yyyymmdd}_${h3}.json`;
  const amedasRes = await fetch(amedasUrl);
  const amedasData = await amedasRes.json();
  const latestKey = Object.keys(amedasData).sort().pop()!;
  const latestTemp = await confirmAqc(amedasData[latestKey].temp);
  const latestPrecipitation10m = await confirmAqc(
    amedasData[latestKey].precipitation10m
  );

  console.log(`現在の気温 : ${latestTemp} 度`);
  console.log(`現在の降水量(10分あたり) : ${latestPrecipitation10m} mm`);
  console.log(`翌日の天気: ${tomorrowWeather}`);
  console.log(`天気概況 : ${overviewForecastText}`);
}
