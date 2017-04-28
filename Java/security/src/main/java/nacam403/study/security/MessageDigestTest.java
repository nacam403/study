package nacam403.study.security;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Base64.Encoder;

import org.junit.Assert;
import org.junit.Test;

public class MessageDigestTest {

    private static final Encoder BASE_64_ENCODER = Base64.getEncoder();

    @Test
    public void test() throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        System.out.println(md.toString());
        System.out.println("DigestLength:" + md.getDigestLength()); // 単位はバイト。SHA-256は256ビットだから、32バイトとなる。

        byte[] sampleBytes = "SampleInputData".getBytes(StandardCharsets.UTF_8);
        byte[] output;

        md.update(sampleBytes);
        output = md.digest();
        printBytes(output);
        Assert.assertEquals(32, output.length);
        // digest()を呼ぶと、インスタンスは初期状態に戻る。

        // update(A+B) == update(A) + update(B)
        byte[] sampleBytes2 = "SampleInputDataSampleInputData".getBytes(StandardCharsets.UTF_8);
        md.update(sampleBytes2);
        output = md.digest();
        printBytes(output);

        md.update(sampleBytes);
        md.update(sampleBytes);
        output = md.digest();
        printBytes(output);

        // byte[]を引数にとるdigest()もある。ひと手間減らせる。
        output = md.digest(sampleBytes);
        printBytes(output);

    }

    private static void printBytes(byte[] bytes) {
        System.out.println(BASE_64_ENCODER.encodeToString(bytes));
    }

}
