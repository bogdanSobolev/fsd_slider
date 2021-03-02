import './index.scss';
import '../../components/slider/slider';

function testTs(nmb: number): string {
    return "вывод числа " + nmb;
}

console.log(testTs(42));