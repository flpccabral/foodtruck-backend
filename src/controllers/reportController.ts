import { Request, Response } from 'express';
import Report from '../models/Report';

export const createReport = async (req: Request, res: Response) => {
  const { tipo, periodo, dados } = req.body;

  try {
    const report = new Report({ tipo, periodo, dados });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const getReportById = async (req: Request, res: Response) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ msg: 'Report not found' });
    res.json(report);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};
