import { response, request } from "express";

import TypeContact from "../models/type";
import Contact from "../models/contact";

export const contactsGet = async (req = request, res = response) => {
  try {
    const user_id = req.userAuth_id;

    const [contacts = [], types = []] = await Promise.all([
      Contact.findAll({
        where: {
          user_id,
        },
      }),
      TypeContact.findAll({}),
    ]);

    if (!contacts || !types) {
      return res.status(400).json({
        message: "Error: contacts or  types contact not found",
      });
    }

    const object = types.reduce((acc, type) => {
      acc[type.dataValues.id] = type.dataValues.type;
      return acc;
    }, {});

    let resp = contacts.map((contact) => {
      contact.dataValues.type_id = object[contact?.dataValues.type_id];
      return contact;
    });

    res.json({
      message: `Success: ${user_id } contacts find successfully`,
      contacts: resp,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Connection server error",
    });
  }
};

export const contactPost = async (req, res = response) => {
  try {
    let { id, ...payload } = req.body;

    payload.user_id = req.userAuth_id;

    let contact = await Contact.create(payload);

    delete contact?.dataValues.password;

    res.status(201).json({ 
      message: `Success: ${req.userAuth_id} created`,
      contact
     });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Connection server error",
    });
  }
};

export const contactPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    const idAuth = req.userAuth_id;
    const { id: idbody, type_id, user_id, ...payload } = req.body;

    const contactFind = await Contact.findByPk(id);

    if (!contactFind) {
      return res.status(400).json({
        message: `Error: id ${id} contac not found `,
      });
    }

    if (idAuth.toString() != contactFind.user_id) {
      return res.status(401).json({
        message: `Error: id ${idAuth} unautherized`,
      });
    }

    const contact = await contactFind.update({
      ...contactFind,
      ...payload,
    });

    res.json({
      message: `Success: id ${id} updated`,
      contact,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Connection server error",
    });
  }
};

export const contactDelete = async (req, res = response) => {
  try {
    const { id } = req.params;
    const idAuth = req.userAuth_id;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(400).json({
        message: `Error: id ${id} contac not found `,
      });
    }
    if (idAuth.toString() != contact.user_id) {
      return res.status(401).json({
        message: `Error: id ${idAuth} unautherized`,
      });
    }
    await contact.destroy();

    res.json({
      msg: `Success: id ${id} deleted`,
      contact
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Connection server error",
    });
  }
};
