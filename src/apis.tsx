const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

import { DeviceInfo, Notarization } from "./interface";

export const getDevices = async (): Promise<Device[] | null> => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      throw new Error("No token found");
    }

    const resp = await fetch(BASE_URL + "/devices", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const json: Device[] = await resp.json();
    console.log(json);
    return json;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

export const addDevice = async (
  address: string,
  machineId: string
): Promise<DeviceInfo[] | null> => {
  try {
    console.log(address, machineId);
    const resp = await fetch(BASE_URL + "/device/add", {
      method: "POST",
      headers: {
        content: "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: new URLSearchParams({
        address: address,
        machineId: machineId,
      }),
    });

    console.log(resp.status);

    if (resp.status === 201) {
      const json: DeviceInfo[] = await resp.json();
      console.log(json);
      return json;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteDevice = async (deviceId: string) => {
  try {
    await fetch(BASE_URL + "/device/delete", {
      method: "POST",
      headers: {
        content: "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: new URLSearchParams({
        id: deviceId,
      }),
    });
  } catch (e) {
    console.log(e);
  }
};

export const getDeviceDetail = async (
  id?: number
): Promise<DeviceInfo | null> => {
  try {
    console.log("Fetching device details for ID:", id);

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const resp = await fetch(`${BASE_URL}/devices/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const json: DeviceInfo = await resp.json();
    return json;
  } catch (e) {
    console.error("Error fetching device details:", e);
    return null;
  }
};

export const verifyData = async (
  address: string,
  data: string
): Promise<boolean | null> => {
  try {
    const resp = await fetch(BASE_URL + "/notarizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        address,
        data,
      }),
    });

    const json = await resp.json();

    console.log(json);

    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const resp = await fetch(BASE_URL + "/auth/login", {
      method: "POST",
      headers: {
        content: "application/json",
      },
      body: new URLSearchParams({
        email: email,
        password: password,
      }),
    });

    if (resp.status === 200) {
      const jsn = await resp.json();

      console.log(jsn.tokens.access.token);
      const token = jsn.tokens?.access.token;
      if (!token) {
        throw new Error("No token found");
      }
      if (token) {
        localStorage.setItem("token", token);
      }
      return jsn.token;
    }

    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const register = async (
  name: string,
  email: string,
  publicKey: string,
  password: string,
  role: string
): Promise<number> => {
  try {
    console.log("test", BASE_URL);
    const resp = await fetch(BASE_URL + "/auth/register", {
      method: "POST",
      headers: {
        content: "application/json",
      },
      body: new URLSearchParams({
        name: name,
        email: email,
        publicKey: publicKey,
        password: password,
        role: role,
      }),
    });

    return resp.status;
  } catch (e) {
    console.log(e);
    return 500;
  }
};

export const checkLogin = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const resp = await fetch(BASE_URL + "/users/get-me", {
      method: "GET",
      headers: {
        content: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (resp.status === 200) {
      return true;
    }

    return false;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const verifyCID = async (cid: string): Promise<boolean> => {
  try {
    const resp = await fetch(BASE_URL + "/notarize/verify-cid?cid=" + cid, {
      method: "GET",
      headers: {
        content: "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (resp.status === 200) {
      return true;
    }

    return false;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getNotarizations = async (): Promise<Notarization[] | null> => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      throw new Error("No token found");
    }

    const resp = await fetch(BASE_URL + "/notarizations", {
      method: "GET",
      headers: {
        content: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (resp.status === 200) {
      const json: Notarization[] = await resp.json();
      console.log(json);
      return json;
    }

    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
