package com.graduation.weather.utils;

import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.exceptions.JedisConnectionException;

import java.util.logging.Logger;

/**
 * Created by apple on 2018/4/24.
 */
public class RedisUtils {
    private static JedisPool pool;

    /**
     * 初始化Redis连接池
     */
    private static void initializePool() {
        JedisPoolConfig config = new JedisPoolConfig();
        //设置最大连接数（100个足够用了，没必要设置太大）
        config.setMaxTotal(100);
        //最大空闲连接数
        config.setMaxIdle(10);
        //获取Jedis连接的最大等待时间（50秒）
        config.setMaxWaitMillis(50 * 1000);
        //在获取Jedis连接时，自动检验连接是否可用
        config.setTestOnBorrow(true);
        //在将连接放回池中前，自动检验连接是否有效
        config.setTestOnReturn(true);
        //自动测试池中的空闲连接是否都是可用连接
        config.setTestWhileIdle(true);
        //创建连接池
        pool = new JedisPool(config, "localhost", 6379);
    }

    /**
     * 多线程环境同步初始化（保证项目中有且仅有一个连接池）
     */
    private static synchronized void poolInit() {
        if (null == pool) {
            initializePool();
        }
    }

    /**
     * 获取Jedis实例
     */
    private static Jedis getJedis() {
        if (null == pool) {
            poolInit();
        }

        int timeoutCount = 0;
        while (true) {
            try {
                if (null != pool) {
                    return pool.getResource();
                }
            } catch (Exception e) {
                if (e instanceof JedisConnectionException) {
                    timeoutCount++;
                    if (timeoutCount > 3) {
                        break;
                    }
                } else {
                    break;
                }
            }
            break;
        }
        return null;
    }

    /**
     * 释放Jedis资源
     *
     * @param jedis
     */
    public static void returnResource(Jedis jedis) {
        if (null != jedis) {
            jedis.close();
        }
    }

    /**
     * 绝对获取方法（保证一定能够使用可用的连接获取到 目标数据）
     * Jedis连接使用后放回
     * @param key
     * @return
     */
    private String safeGet(String key) {
        Jedis jedis = getJedis();
        while (true) {
            if (null != jedis) {
                break;
            } else {
                jedis = getJedis();
            }
        }
        String value = jedis.get(key);
        returnResource(jedis);
        return value;
    }

    /**
     * 绝对设置方法（保证一定能够使用可用的链接设置 数据）
     * Jedis连接使用后返回连接池
     * @param key
     * @param time
     * @param value
     */
    private void safeSet(String key, int time, String value) {
        Jedis jedis = getJedis();
        while (true) {
            if (null != jedis) {
                break;
            } else {
                jedis = getJedis();
            }
        }
        jedis.setex(key, time, value);
        returnResource(jedis);
    }



}
